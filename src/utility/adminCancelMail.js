const adminCancelMail = (name, email, date, slot, servicesName) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Cancellation Notification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                color: #333;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #ddd;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #b71c1c;
                padding: 20px;
                text-align: center;
            }
            .header h1 {
                color: #ffffff;
                margin: 0;
                font-size: 22px;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content h2 {
                color: #d9534f;
                font-size: 20px;
                margin-bottom: 10px;
            }
            .details {
                margin: 20px 0;
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 5px;
                text-align: left;
                display: inline-block;
            }
            .details p {
                margin: 5px 0;
                font-size: 16px;
            }
            .footer {
                background-color: #222;
                color: #ffffff;
                text-align: center;
                padding: 15px;
                font-size: 14px;
            }
            .footer a {
                color: #ffffff;
                text-decoration: none;
            }
            .footer a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Booking Cancellation Notification</h1>
            </div>
            <div class="content">
                <h2>A booking has been canceled</h2>
                <p>Here are the details of the canceled booking:</p>
                <div class="details">
                    <p><strong>User Name:</strong> ${name}</p>
                    <p><strong>User Email:</strong> ${email}</p>
                    <p><strong>Service:</strong> ${servicesName}</p>
                    <p><strong>Date:</strong> ${date}</p>
                    <p><strong>Time Slot:</strong> ${slot}</p>
                </div>
                <p>If you need to take any further action, please contact the user directly.</p>
            </div>
            <div class="footer">
                <p>&copy; 2025 Your Company Name. All rights reserved.</p>
                <p>123 Business Street, City, Country | <a href="mailto:admin@example.com">admin@example.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = adminCancelMail;
