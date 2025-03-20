const adminMail = (name,phone,slot,email,bookingDate) => {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #eef5ff;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0px 4px 15px rgba(0, 123, 255, 0.2);
            border: 1px solid #007bff;
        }
        .header {
            background-color: #007bff;
            padding: 20px;
            text-align: center;
        }
        .header img {
            max-width: 160px;
        }
        .content {
            padding: 25px;
            color: #333;
            text-align: center;
        }
        .content h2 {
            color: #0056b3;
            margin-bottom: 15px;
        }
        .details {
            background: #f0f8ff;
            padding: 18px;
            border-radius: 8px;
            margin: 20px;
            text-align: left;
            border-left: 5px solid #007bff;
        }
        .details p {
            margin: 8px 0;
            font-size: 16px;
            color: #0056b3;
        }
        .footer {
            background: #007bff;
            color: #fff;
            text-align: center;
            padding: 15px;
            font-size: 14px;
        }
        .button {
            background-color: #0056b3;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            display: inline-block;
            margin-top: 15px;
            font-size: 16px;
            font-weight: bold;
        }
        .button:hover {
            background-color: #004494;
        }
    </style>
</head>
<body>

    <div class="email-container">
        <!-- Header with Logo -->
        <div class="header">
            <img src="https://piercing-sodermalm.web.app/assets/logo-CwXzsCy3.png" alt="Company Logo">
        </div>

        <!-- Main Content -->
        <div class="content">
            <h2>New Booking Received</h2>
            <p>Dear Admin,</p>
            <p>A new booking has been made. Please review the details below:</p>

            <!-- Booking Details -->
            <div class="details">
                <p><strong>Client Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Booking Date:</strong> ${bookingDate}</p>
                <p><strong>Time:</strong> ${slot}</p>
              
            </div>

           
        </div>

        <!-- Footer -->
        <div class="footer">
            &copy; 2025  Piercing Södermalm | Admin Notification
        </div>
    </div>

</body>
</html>


`
}
  
module.exports =  adminMail ;