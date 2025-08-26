# IT Legend Calculator

A sophisticated multi-step IT services calculator that helps organizations assess their IT challenges and receive personalized service recommendations with impact calculations.

## Features

### 🧮 **Calculator Functionality**
- **3-Step Process**: Pain points → Environment → Results
- **Dynamic Calculations**: Real-time impact estimates based on organization size and technology stack
- **Service Recommendations**: Ranked by potential impact
- **Professional UI**: Modern, responsive design with smooth animations

### 📊 **Dashboard System**
- **Real-time Analytics**: View all submissions in a professional dashboard
- **Data Management**: Export CSV, delete entries, refresh data
- **Responsive Design**: Works on desktop and mobile devices
- **Secure Access**: Optional password protection

### 📧 **Email System**
- **Lead Capture**: Professional email notifications for new submissions
- **CSV Backup**: Automatic data storage for all submissions
- **PHPMailer Integration**: Reliable email delivery (upgrade in progress)

## File Structure

```
calculator/
├── index.html              # Main calculator interface
├── submit.php              # Email backend (current: mail() function)
├── dashboard.html          # Admin dashboard
├── get_submissions.php     # Dashboard data API
├── delete_submission.php   # Delete functionality
├── .htaccess              # Security configuration
├── .gitignore             # Git exclusions
├── README.md              # This file
├── PHPMailer/             # Email library (for upgrade)
└── data/                  # Submission storage (excluded from Git)
    └── submissions.csv    # User data (not in repository)
```

## Installation

1. **Upload files** to your web server
2. **Set permissions**: Ensure PHP can write to `data/` directory
3. **Configure email**: Update email address in `submit.php`
4. **Test functionality**: Complete calculator flow and check dashboard

## Usage

### Calculator
- Visit `index.html` to access the calculator
- Complete the 3-step process
- Submit contact information to receive detailed recommendations

### Dashboard
- Access via `dashboard.html`
- View all submissions with real-time data
- Export data or delete individual entries
- Refresh to see new submissions

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: PHP 7.0+
- **Email**: PHP mail() function (upgrading to PHPMailer)
- **Data Storage**: CSV files
- **Hosting**: Compatible with DreamHost, GoDaddy, etc.

## Security Features

- **Input Sanitization**: All user inputs are validated and sanitized
- **CSV Protection**: Data directory protected by .htaccess
- **Optional Authentication**: Password protection for dashboard
- **Error Handling**: Graceful error messages without exposing sensitive data

## Development Status

- ✅ **Core Calculator**: Complete and functional
- ✅ **Dashboard System**: Complete with export/delete features
- ✅ **Email System**: Working with PHP mail()
- 🔄 **PHPMailer Upgrade**: In progress for better deliverability

## Support

For issues or questions, please refer to the deployment documentation or contact the development team.

## License

This project is proprietary software developed for Crayon IT services.
