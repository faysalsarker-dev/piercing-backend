const contactMail = (name, email,message) => {
    return `

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Nytt kontaktmeddelande</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background: #f9f9f9;
        }
        .header {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .info {
            margin-bottom: 10px;
        }
        .message {
            padding: 10px;
            background: #fff;
            border-left: 4px solid #007bff;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Nytt kontaktmeddelande</div>
        <div class="info"><strong>Namn:</strong> ${name}</div>
        <div class="info"><strong>E-post:</strong> ${email}</div>
        <div class="message">
            <strong>Meddelande:</strong>
            <p>${message}</p>
        </div>
    </div>
</body>
</html>

`
};

module.exports = contactMail;


