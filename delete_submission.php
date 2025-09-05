<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Basic security - password protection (must match get_submissions.php)
$dashboard_password = 'YOUR_DASHBOARD_PASSWORD';
$providedPassword = null;

// Support JSON body or form/query param
if ($_SERVER['CONTENT_TYPE'] === 'application/json') {
    $jsonInput = json_decode(file_get_contents('php://input'), true);
    if (is_array($jsonInput) && isset($jsonInput['password'])) {
        $providedPassword = $jsonInput['password'];
    }
    // Reset php://input for later use
    $GLOBALS['HTTP_RAW_POST_DATA'] = $jsonInput;
} else {
    $providedPassword = $_POST['password'] ?? $_GET['password'] ?? null;
}

if ($dashboard_password !== '') {
    if ($providedPassword !== $dashboard_password) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized access']);
        exit();
    }
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get JSON input (reuse parsed body if available)
if (isset($GLOBALS['HTTP_RAW_POST_DATA']) && is_array($GLOBALS['HTTP_RAW_POST_DATA'])) {
    $data = $GLOBALS['HTTP_RAW_POST_DATA'];
} else {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
}

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit();
}

// Validate required fields for identification
if (empty($data['timestamp']) || empty($data['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields for deletion']);
    exit();
}

$csv_file = 'data/submissions.csv';
if (!file_exists($csv_file)) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'No submissions file found']);
    exit();
}

try {
    // Read all submissions
    $submissions = [];
    $file_handle = fopen($csv_file, 'r');
    
    if (!$file_handle) {
        throw new Exception('Could not open CSV file for reading');
    }
    
    // Read the header row
    $headers = fgetcsv($file_handle);
    if (!$headers) {
        throw new Exception('Invalid CSV format - no headers found');
    }
    
    $submissions[] = $headers; // Keep headers for rewriting
    
    // Read data rows and filter out the one to delete
    $deleted = false;
    $rowsProcessed = 0;
    
    while (($row = fgetcsv($file_handle)) !== FALSE) {
        // Skip empty rows
        if (empty(array_filter($row))) {
            continue;
        }
        
        $rowsProcessed++;
        
        // Combine headers with row data for comparison
        $submission = array_combine($headers, $row);
        
        if ($submission) {
            // Check if this is the row to delete (match by timestamp and email)
            $matchesTimestamp = ($submission['Timestamp'] === $data['timestamp']);
            $matchesEmail = ($submission['Email'] === $data['email']);
            
            if ($matchesTimestamp && $matchesEmail && !$deleted) {
                // This is the row to delete - skip adding it
                $deleted = true;
                continue;
            }
        }
        
        // Keep this row
        $submissions[] = $row;
    }
    
    fclose($file_handle);
    
    if (!$deleted) {
        echo json_encode(['success' => false, 'message' => 'Submission not found for deletion']);
        exit();
    }
    
    // Create backup of original file
    $backup_file = $csv_file . '.backup.' . date('Y-m-d_H-i-s');
    if (!copy($csv_file, $backup_file)) {
        error_log("Warning: Could not create backup file: $backup_file");
    }
    
    // Rewrite the CSV file without the deleted row
    $file_handle = fopen($csv_file, 'w');
    if (!$file_handle) {
        throw new Exception('Could not open CSV file for writing');
    }
    
    foreach ($submissions as $row) {
        fputcsv($file_handle, $row);
    }
    
    fclose($file_handle);
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Submission deleted successfully',
        'rows_remaining' => count($submissions) - 1, // Subtract 1 for header row
        'backup_created' => file_exists($backup_file)
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Error deleting submission: ' . $e->getMessage()
    ]);
}
?>
