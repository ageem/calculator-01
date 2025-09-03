<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Prevent caching
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

// Basic security - password protection (set your password here)
$dashboard_password = 'Cr@yon-IT-L3g3nd!';
if ($dashboard_password !== '') {
    if (!isset($_GET['password']) || $_GET['password'] !== $dashboard_password) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized access']);
        exit();
    }
}

// Only accept GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Check if CSV file exists
$csv_file = 'data/submissions.csv';
if (!file_exists($csv_file)) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'No submissions found']);
    exit();
}

try {
    $submissions = [];
    $file_handle = fopen($csv_file, 'r');
    
    if (!$file_handle) {
        throw new Exception('Could not open CSV file');
    }
    
    // Read the header row
    $headers = fgetcsv($file_handle);
    if (!$headers) {
        throw new Exception('Invalid CSV format - no headers found');
    }
    
    // Read data rows
    while (($row = fgetcsv($file_handle)) !== FALSE) {
        // Skip empty rows
        if (empty(array_filter($row))) {
            continue;
        }
        
        // Combine headers with row data
        $submission = array_combine($headers, $row);
        if ($submission) {
            $submissions[] = $submission;
        }
    }
    
    fclose($file_handle);
    
    // Sort by timestamp (most recent first)
    usort($submissions, function($a, $b) {
        $timeA = strtotime($a['Timestamp'] ?? '');
        $timeB = strtotime($b['Timestamp'] ?? '');
        return $timeB - $timeA; // Descending order (newest first)
    });
    
    // Return successful response
    echo json_encode([
        'success' => true,
        'submissions' => $submissions,
        'total_count' => count($submissions),
        'last_updated' => date('Y-m-d H:i:s')
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Error reading submissions: ' . $e->getMessage()
    ]);
}
?>
