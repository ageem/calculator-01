     // Helpers for password management
     function getDashboardPassword() {
        let pwd = window.sessionStorage.getItem('dashboard_password');
        if (!pwd) {
            pwd = prompt('Enter dashboard password:');
            if (pwd) {
                window.sessionStorage.setItem('dashboard_password', pwd);
            }
        }
        return pwd || '';
    }

    function clearDashboardPassword() {
        try { window.sessionStorage.removeItem('dashboard_password'); } catch (e) {}
    }

    // Load submissions on page load
    document.addEventListener('DOMContentLoaded', function() {
        getDashboardPassword();
        loadSubmissions();
        
        // Auto-refresh every 30 seconds - COMMENTED OUT
        // setInterval(loadSubmissions, 30000);
    });

    function loadSubmissions() {
        console.log('Loading submissions...', new Date().toLocaleTimeString());
        
        // Add cache-busting parameter and show loading state
        const refreshBtn = document.querySelector('.refresh-btn');
        const originalText = refreshBtn ? refreshBtn.textContent : '';
        if (refreshBtn) {
            refreshBtn.textContent = 'Loading...';
            refreshBtn.disabled = true;
        }
        
        // Add timestamp to prevent caching
        const cacheBuster = '?t=' + new Date().getTime();
        const pwd = getDashboardPassword();
        const url = 'get_submissions.php' + cacheBuster + (pwd ? ('&password=' + encodeURIComponent(pwd)) : '');
        
        console.log('Fetching from URL:', url); // Debug log
        
        fetch(url)
            .then(response => {
                console.log('Response received:', response.status, response.statusText);
                if (response.status === 401) {
                    clearDashboardPassword();
                    alert('Unauthorized. Please enter the updated dashboard password.');
                    getDashboardPassword();
                    // Retry once immediately
                    loadSubmissions();
                    throw new Error('Unauthorized (401)');
                }
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);
                if (data.success) {
                    currentSubmissions = data.submissions; // Store for export
                    displaySubmissions(data.submissions);
                    
                    // Update last refreshed time
                    const now = new Date();
                    const timeStr = now.toLocaleTimeString();
                    document.getElementById('lastUpdated').textContent = `Last updated: ${timeStr}`;
                    
                    console.log(`✅ Successfully loaded ${data.submissions.length} submissions at ${timeStr}`);
                } else {
                    showError('Error loading submissions: ' + data.message);
                    console.error('❌ API Error:', data.message);
                }
            })
            .catch(error => {
                console.error('Fetch Error:', error);
                showError('Failed to load submissions: ' + error.message);
            })
            .finally(() => {
                // Restore refresh button
                if (refreshBtn) {
                    refreshBtn.textContent = originalText;
                    refreshBtn.disabled = false;
                }
            });
    }



    function displaySubmissions(submissions) {
        const container = document.getElementById('tableContent');
        
        if (submissions.length === 0) {
            container.innerHTML = '<div class="loading">No submissions found.</div>';
            return;
        }

        let tableHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Phone</th>
                        <th>Org Size</th>
                        <th>Pain Points</th>
                        <th>Technologies</th>
                        <th>Has EA</th>
                        <th>Est. Impact</th>
                        <th class="actions-column">Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        submissions.forEach((submission, index) => {
            tableHTML += `
                <tr>
                    <td class="timestamp">${submission['Timestamp'] || ''}</td>
                    <td>${submission['First Name'] || ''} ${submission['Last Name'] || ''}</td>
                    <td>${submission['Email'] || ''}</td>
                    <td>${submission['Company'] || ''}</td>
                    <td>${submission['Phone'] || ''}</td>
                    <td>${submission['Organization Size'] || ''}</td>
                    <td class="pain-points" title="${submission['Pain Points'] || ''}">${submission['Pain Points'] || ''}</td>
                    <td class="technologies" title="${submission['Technologies'] || ''}">${submission['Technologies'] || ''}</td>
                    <td>${submission['Has EA'] || ''}</td>
                    <td class="impact-value">${submission['Estimated Impact'] || ''}</td>
                    <td class="actions-column">
                        <button class="btn delete-btn" onclick="deleteSubmission(${index})" title="Delete this submission">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });

        tableHTML += '</tbody></table>';
        container.innerHTML = tableHTML;
    }

    function showError(message) {
        const container = document.getElementById('tableContent');
        container.innerHTML = `<div class="error">${message}</div>`;
    }

    // Global variable to store current submissions data
    let currentSubmissions = [];

    function exportToCSV() {
        if (currentSubmissions.length === 0) {
            alert('No data to export. Please wait for submissions to load.');
            return;
        }

        // Create CSV content
        const headers = Object.keys(currentSubmissions[0]);
        let csvContent = headers.join(',') + '\n';

        // Add data rows
        currentSubmissions.forEach(submission => {
            const row = headers.map(header => {
                let value = submission[header] || '';
                // Escape quotes and wrap in quotes if contains comma or quote
                if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                    value = '"' + value.replace(/"/g, '""') + '"';
                }
                return value;
            });
            csvContent += row.join(',') + '\n';
        });

        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            
            // Generate filename with current date
            const now = new Date();
            const dateStr = now.getFullYear() + 
                String(now.getMonth() + 1).padStart(2, '0') + 
                String(now.getDate()).padStart(2, '0') + '_' +
                String(now.getHours()).padStart(2, '0') +
                String(now.getMinutes()).padStart(2, '0');
            
            link.setAttribute('download', `it_legend_submissions_${dateStr}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show success message
            const exportBtn = document.querySelector('.export-btn');
            const originalText = exportBtn.textContent;
            exportBtn.textContent = 'Exported!';
            exportBtn.style.background = '#10b981';
            
            setTimeout(() => {
                exportBtn.textContent = originalText;
                exportBtn.style.background = '#0A5565';
            }, 2000);
        }
    }

    function deleteSubmission(index) {
        if (index < 0 || index >= currentSubmissions.length) {
            alert('Invalid submission index.');
            return;
        }

        const submission = currentSubmissions[index];
        const name = `${submission['First Name'] || ''} ${submission['Last Name'] || ''}`.trim();
        const company = submission['Company'] || '';
        const timestamp = submission['Timestamp'] || '';
        
        // Confirmation dialog
        const confirmMessage = `Are you sure you want to delete this submission?\n\n` +
            `Name: ${name}\n` +
            `Company: ${company}\n` +
            `Time: ${timestamp}\n\n` +
            `This action cannot be undone.`;
        
        if (!confirm(confirmMessage)) {
            return;
        }

        // Send delete request to server
        const pwd = window.sessionStorage.getItem('dashboard_password') || '';
        fetch('delete_submission.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                timestamp: submission['Timestamp'],
                email: submission['Email'],
                index: index,
                password: pwd
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Remove from local array and refresh display
                currentSubmissions.splice(index, 1);
                displaySubmissions(currentSubmissions);
                
                // Show success message
                alert('Submission deleted successfully.');
            } else {
                alert('Error deleting submission: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to delete submission. Please try again.');
        });
    }