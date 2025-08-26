<?php
// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit();
}

// Validate required fields
$required_fields = ['firstName', 'lastName', 'email', 'company'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit();
    }
}

// Validate email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit();
}

// Sanitize input data
function sanitizeInput($input) {
    if (is_array($input)) {
        return array_map('sanitizeInput', $input);
    }
    return htmlspecialchars(strip_tags(trim($input)), ENT_QUOTES, 'UTF-8');
}

$sanitized_data = sanitizeInput($data);

// Pain point mapping for display
$pain_point_names = [
    1 => "Cloud Cost Chaos",
    2 => "AI Overwhelm", 
    3 => "License Complexity",
    4 => "Audit Anxiety",
    5 => "Cloud Migration Mayhem",
    6 => "CSP Confusion",
    7 => "Security Threats",
    8 => "Microsoft Support Bottlenecks"
];

// Format pain points for display
$selected_pain_points = [];
if (!empty($sanitized_data['painPoints']) && is_array($sanitized_data['painPoints'])) {
    foreach ($sanitized_data['painPoints'] as $pain_point_id) {
        if (isset($pain_point_names[$pain_point_id])) {
            $selected_pain_points[] = $pain_point_names[$pain_point_id];
        }
    }
}

// Format technologies
$technologies = !empty($sanitized_data['technologies']) && is_array($sanitized_data['technologies']) 
    ? implode(', ', $sanitized_data['technologies']) 
    : 'None specified';

// Format EA status
$ea_status = isset($sanitized_data['hasEA']) 
    ? ($sanitized_data['hasEA'] ? 'Yes' : 'No') 
    : 'Not specified';

// Format recommended services
$recommended_services = !empty($sanitized_data['recommendedServices']) && is_array($sanitized_data['recommendedServices'])
    ? $sanitized_data['recommendedServices']
    : [];

// Format estimated impact
$estimated_impact = !empty($sanitized_data['estimatedImpact']) 
    ? '$' . number_format($sanitized_data['estimatedImpact'], 0) 
    : 'Not calculated';

// Format organization size
$org_size = !empty($sanitized_data['seats']) 
    ? number_format($sanitized_data['seats']) . ' users'
    : 'Not specified';

// Create email content
$subject = "IT Legend Calculator Submission - " . $sanitized_data['company'];

$email_body = "<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #FF370F; color: white; padding: 20px; text-align: center; }
        .section { margin: 20px 0; padding: 15px; border-left: 4px solid #FF370F; background: #f9f9f9; }
        .highlight { color: #FF370F; font-weight: bold; }
        .services-list { background: white; padding: 15px; border-radius: 5px; }
        .services-list ol { margin: 10px 0; }
        .services-list li { margin: 5px 0; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class='header'>
        <h1>IT Legend Calculator Submission</h1>
        <p>New lead generated from calculator</p>
    </div>
    
    <div class='section'>
        <h2>Contact Information</h2>
        <table>
            <tr><th>Name:</th><td>{$sanitized_data['firstName']} {$sanitized_data['lastName']}</td></tr>
            <tr><th>Email:</th><td>{$sanitized_data['email']}</td></tr>
            <tr><th>Company:</th><td>{$sanitized_data['company']}</td></tr>
            <tr><th>Phone:</th><td>" . (!empty($sanitized_data['phone']) ? $sanitized_data['phone'] : 'Not provided') . "</td></tr>
            <tr><th>Organization Size:</th><td>$org_size</td></tr>
        </table>
    </div>
    
    <div class='section'>
        <h2>IT Challenges Selected</h2>";

if (!empty($selected_pain_points)) {
    $email_body .= "<ul>";
    foreach ($selected_pain_points as $pain_point) {
        $email_body .= "<li>$pain_point</li>";
    }
    $email_body .= "</ul>";
} else {
    $email_body .= "<p>No challenges selected</p>";
}

$email_body .= "</div>
    
    <div class='section'>
        <h2>Technology Environment</h2>
        <table>
            <tr><th>Technologies:</th><td>$technologies</td></tr>
            <tr><th>Enterprise Agreement:</th><td>$ea_status</td></tr>
        </table>
    </div>
    
    <div class='section'>
        <h2>Calculated Results</h2>
        <p><span class='highlight'>Estimated Annual Impact: $estimated_impact</span></p>";

if (!empty($recommended_services)) {
    $email_body .= "<div class='services-list'>
            <h3>Recommended Services (Ranked by Impact):</h3>
            <ol>";
    foreach ($recommended_services as $service) {
        $email_body .= "<li>$service</li>";
    }
    $email_body .= "</ol></div>";
}

$email_body .= "</div>
    
    <div class='section'>
        <h2>Submission Details</h2>
        <table>
            <tr><th>Timestamp:</th><td>" . date('Y-m-d H:i:s T') . "</td></tr>
            <tr><th>IP Address:</th><td>" . $_SERVER['REMOTE_ADDR'] . "</td></tr>
            <tr><th>User Agent:</th><td>" . $_SERVER['HTTP_USER_AGENT'] . "</td></tr>
        </table>
    </div>
</body>
</html>";

// Email headers - use a more reliable From address
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: IT Legend Calculator <noreply@mikeagee.com>" . "\r\n";
$headers .= "Reply-To: {$sanitized_data['email']}" . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Check if we're running locally
$is_local = (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false) || 
            (strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false) ||
            (strpos($_SERVER['HTTP_HOST'], '127.0.0.1:') !== false);

// Debug logging
error_log("HTTP_HOST: " . $_SERVER['HTTP_HOST']);
error_log("Is local: " . ($is_local ? 'true' : 'false'));

// Send email (skip for local testing)
$email_sent = false;
if (!$is_local) {
    // Add detailed email debugging for production
    error_log("PRODUCTION - Attempting to send email to: mikeagee@gmail.com");
    error_log("Subject: " . $subject);
    error_log("From header: noreply@" . $_SERVER['HTTP_HOST']);
    
    // Try both methods - mail() and a backup method
    $email_sent = mail('mikeagee@gmail.com', $subject, $email_body, $headers);
    
    // Also try with additional parameters for DreamHost
    if (!$email_sent) {
        $additional_params = '-f noreply@mikeagee.com';
        $email_sent = mail('mikeagee@gmail.com', $subject, $email_body, $headers, $additional_params);
        error_log("Retry with additional params: " . ($email_sent ? 'SUCCESS' : 'FAILED'));
    }
    
    error_log("Mail function result: " . ($email_sent ? 'SUCCESS' : 'FAILED'));
    
    if (!$email_sent) {
        $last_error = error_get_last();
        if ($last_error) {
            error_log("Last PHP error: " . $last_error['message']);
        }
    }
} else {
    // For local testing, just log the email content
    error_log("LOCAL TESTING - Email would be sent to mikeagee@gmail.com");
    error_log("Subject: " . $subject);
    error_log("Body length: " . strlen($email_body) . " characters");
    $email_sent = true; // Simulate success for local testing
}

// Save to CSV file
$csv_success = false;
$csv_error = '';
try {
    // Ensure data directory exists
    if (!is_dir('data')) {
        if (!mkdir('data', 0755, true)) {
            throw new Exception("Could not create data directory");
        }
    }
    
    $csv_file = 'data/submissions.csv';
    $file_exists = file_exists($csv_file);
    
    $file_handle = fopen($csv_file, 'a');
    
    if (!$file_handle) {
        throw new Exception("Could not open CSV file for writing");
    }
    
    // Add headers if file is new
    if (!$file_exists) {
        fputcsv($file_handle, [
            'Timestamp',
            'First Name',
            'Last Name', 
            'Email',
            'Company',
            'Phone',
            'Organization Size',
            'Pain Points',
            'Technologies',
            'Has EA',
            'Estimated Impact',
            'Recommended Services',
            'IP Address'
        ]);
    }
    
    // Add data row
    fputcsv($file_handle, [
        date('Y-m-d H:i:s'),
        $sanitized_data['firstName'],
        $sanitized_data['lastName'],
        $sanitized_data['email'],
        $sanitized_data['company'],
        !empty($sanitized_data['phone']) ? $sanitized_data['phone'] : '',
        $org_size,
        implode('; ', $selected_pain_points),
        $technologies,
        $ea_status,
        $estimated_impact,
        implode('; ', $recommended_services),
        $_SERVER['REMOTE_ADDR']
    ]);
    
    fclose($file_handle);
    $csv_success = true;
    
} catch (Exception $e) {
    $csv_error = $e->getMessage();
    error_log("CSV save error: " . $csv_error);
}

// Return response
http_response_code(200);
if ($email_sent && $csv_success) {
    echo json_encode([
        'success' => true, 
        'message' => $is_local ? 'Local test: Submission processed successfully' : 'Submission received successfully',
        'csv_saved' => $csv_success,
        'email_sent' => $email_sent,
        'local_testing' => $is_local
    ]);
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Submission processed with issues: ' . 
                    (!$email_sent ? 'Email failed. ' : '') . 
                    (!$csv_success ? 'CSV save failed: ' . $csv_error : ''),
        'csv_saved' => $csv_success,
        'email_sent' => $email_sent,
        'local_testing' => $is_local
    ]);
}
?>
