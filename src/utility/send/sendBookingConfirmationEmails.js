const { format } = require('date-fns');
const sendMail = require('./sendMail');
const mailTemplate = require('./emailTemplates/userConfirmation');
const adminMail = require('./emailTemplates/adminConfirmation');

const sendBookingConfirmationEmails = async (bookingData) => {
  const {
    name,
    email,
    phone,
    slot,
    price,
    servicesName,
    bookingDate,
  } = bookingData;

  // Skip sending if no email available
  if (!email || email === 'N/A') return;

  // Format the booking date: Example → "May 21, 2025"
  const formattedDate = format(new Date(bookingDate), 'MMMM dd, yyyy');

  try {
    await Promise.all([
      // Send confirmation to user
      sendMail(
        email,
        'Booking Confirmation',
        mailTemplate(name, formattedDate, slot, price, servicesName)
      ),

      // Send new booking alert to admin
      sendMail(
        process.env.EMAIL_AUTHOR,
        'New Booking Received',
        adminMail(name, phone, slot, email, formattedDate, servicesName, price)
      )
    ]);
  } catch (err) {
    console.error('Booking confirmation email error:', err);
  }
};

module.exports = sendBookingConfirmationEmails;
