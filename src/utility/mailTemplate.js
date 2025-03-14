const emailTemplate = (name,date) => {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
    <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="text-align: center; padding: 10px;">
                <h2 style="color: #D32F2F; margin: 10px 0;">Booking Confirmation</h2>
            </td>
        </tr>
        <tr>
            <td style="text-align: center; padding: 10px;">
                <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
                <p style="font-size: 16px;">Thank you for booking an appointment with <strong>Piercing Södermalm</strong>! Here are your details:</p>
                <p style="font-size: 18px; font-weight: bold;">📅 Date: ${date}</p>
                <p style="font-size: 16px;">We look forward to seeing you! If you need to make changes, please contact us.</p>
                <p style="font-size: 14px; color: #777; margin-top: 20px;">Best Regards,<br><strong>Piercing Södermalm Team</strong></p>
                <p style="font-size: 14px; color: #777;">Visit us at <a href="https://piercingsodermalm.com" style="color: #D32F2F; text-decoration: none;">piercingsodermalm.com</a></p>
            </td>
        </tr>
    </table>
</body>
</html>
`
};
  
module.exports =  emailTemplate ;