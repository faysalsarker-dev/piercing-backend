const userCancelMail = (userName, date, slot, servicesName) => {
    return `
    <!DOCTYPE html>
    <html lang="sv">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bekräftelse på avbokning</title>
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
                background-color: #d9534f;
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
                <h1>Bekräftelse på avbokning</h1>
            </div>
            <div class="content">
                <h2>Hej, ${userName}</h2>
                <p>Din bokning har avbokats. Här är detaljerna:</p>
                <div class="details">
                    <p><strong>Tjänst:</strong> ${servicesName}</p>
                    <p><strong>Datum:</strong> ${date}</p>
                    <p><strong>Tid:</strong> ${slot}</p>
                </div>
                <p>Om detta var ett misstag eller om du vill boka om, vänligen kontakta oss.</p>
                <p><a href="mailto:support@example.com">support@example.com</a></p>
            </div>
            <div class="footer">
                <p>&copy; 2025 Ditt Företagsnamn. Alla rättigheter förbehållna.</p>
                <p>123 Affärsgatan, Stad, Land | <a href="mailto:support@example.com">support@example.com</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = userCancelMail;