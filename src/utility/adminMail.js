const adminMail = (name, phone, slot, email, bookingDate, servicesName, price) => {
    return `
    <!DOCTYPE html>
<html lang="sv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ny Bokning Mottagen - Piercing Södermalm</title>
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
            background-color: #222;
            padding: 20px;
            text-align: center;
        }
        .header img {
            max-width: 150px;
        }
        .header h1 {
            color: #ffffff;
            margin: 10px 0 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #222;
            font-size: 20px;
            margin-bottom: 10px;
        }
        .details {
            margin: 20px 0;
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
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
            <img src="cid:logo123" alt="Piercing Södermalm Logo">
            <h1>Ny Bokning Mottagen</h1>
        </div>
        <div class="content">
            <h2>Bokningsdetaljer:</h2>
            <div class="details">
                <p><strong>Namn:</strong> ${name}</p>
                <p><strong>Telefon:</strong> ${phone}</p>
                <p><strong>E-post:</strong> ${email}</p>
                <p><strong>Bokningsdatum:</strong> ${bookingDate}</p>
                <p><strong>Tjänst:</strong> ${servicesName}</p>
                <p><strong>Tid:</strong> ${slot}</p>
                <p><strong>Pris:</strong> ${price}</p>
            </div>
            <p>Tack för din uppmärksamhet. Vänligen följ upp med kunden vid behov.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Piercing Södermalm. Alla rättigheter förbehållna.</p>
            <p>Åsögatan 128, 11624 Stockholm, Sverige | 08-6415057 | <a href="mailto:piercingsodermalm@gmail.com">piercingsodermalm@gmail.com</a></p>
        </div>
    </div>
</body>
</html>
`
}

module.exports = adminMail;
