




const { google } = require('googleapis');
const { GoogleAuth } = google.auth;
const serviceAccount = {
  "type": "service_account",
  "project_id": "piercing-sodermalm-df1e6",
  "private_key_id": "f209a9acfe6acda7907fc4793130305447bae1f0",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDz6Q/C/LglUvOX\nBcJ3KFRcPrBuLr4ojsTL9wHq+5WVErERtzJ0pjZhl7crUDbt1lNcr5Myt6k7O2j0\n72RAXLe2W1Xdo9PwSvEfcNpFbR8JB6isBzP/Z8iL6HvOsP/Ka+9hwPzaYyN7h8/+\nuOoR7Y3euZZza1tSqwxTapJvC0AJrLOcalGSS1Uh81+eLR+sty2dy+Yk78RFBSJE\nJZvcjrnTUN2wgwGMD79EFkfksk44oeXINfle/yZQmtRusE8jM1VmuPY5m1a7nke3\ncXrHc5ueLMfCphaDXMkypNQT4mz2a556c2ZR3mKTnn97/cIqer0tbYMiaPmSsoaX\nmg8dmL3RAgMBAAECggEACqCbgrPvNBUervRdykJUFqbWmh5oQ60gzwBGsZ3foRys\n4Wg5hxKc6PiqzvTSR9+gRzgRMlMFSSLoClAJ7rH7gTMOlTcnq18gjW2l3QOJqCOQ\nyloP/m9fshThnBpjMscsKXa2ra9HIwFCY0dcT4apuUwdzY6eboYsZdANbFAxrJon\nfCRDoZa+/vyr1eZRaym+HSP8a8YptDteuVEJ4dWaeA0ZZZXT+H7f5CzaYz+vsAer\nMI4LpNlyvtALgHz4TUcev0Bhr77dEJnEavdlAr7r2+jXDnPudO4I0Za/PTNM2ODY\nsG9/BUqvrCd/pGP+YIJTRBqcUvc2CpfhGbzZ4YN5iQKBgQD9o0xTBfnqZeAZXEFo\nEfoxw18bHqVM0fOCZjGc4MQxNY5Ui5Ru0H/tqXEXmu/2dQMCtQyRkwrEW5f4+bTU\nadSJGuEpKY3N7blJcDFZqz+JEZZzZoydqUHbTnFbDKkuSL0K5HYak924dIWAPHOC\nzhf1tlXdehkD94Kp01q7zu74TQKBgQD2LpJtXuAt7hX62qxZj8lJO6Sj9T/jwguT\ns9aSj7et/LHdfWXZe8ng1yNeF0dYux3b1n3LaLO8QfN0LOevasC9eG7elAP1a5tM\nTI6IG3KM2VseI56/SSOxXZVXxa9PyTAG/Kst0U3QGmuhFEVfAfRCS08DbRgmks/I\niihRtKedlQKBgAu7+lP8+sr1W6DQu9Xsvv5+Y3AFwvAC5pkp0THI1ErSh3sx2fQm\ngUSlii3lZSSp1THS3nn9q4naEvXZ15vcKZEORUx6N61HSkMzhZT4b0AQKD2+iNLi\necGDp4rm0wzpIJXYa/5eyOs3uNVt9ooers0XWnGcrHuaf9kLhi8aK8QhAoGBAM8q\nFdKv2lsMVbbJueuMUkisRjorMd6J9pAO8GxZQKrLUSogUksYHqR0prCRSlri65eK\nAkXgEBBGN4b2GunFHfjTlgj76fDm4sLsUa0728OnTUQpmXdDJyQkqn44PvUXSrE2\ngx6FWcPb1+KvWkk/Lbt0AEPT1FTxiqUpjhBjxAGZAoGBAKlojxKbJN8kGPlLS/fp\nFEWhbqpkVzZGorTxHr/5fA+v8OCi03rlbMkBIekxYZBrL21t9sJ9PowlFqE+A2Ic\nwNica/5IvMFLgbdxab2ZNt7Xkwmj38Bfn17dy5GdxGxW/VLQ26buLQHUaHRSQOHT\nAA08ow0rWX3hX5VA1qU2Yj4U\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@piercing-sodermalm-df1e6.iam.gserviceaccount.com",
  "client_id": "104314004816970093735",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40piercing-sodermalm-df1e6.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

async function addToAdminCalendar(date, time, eventTitle, eventDescription) {
  try {
    const authClient = new GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    authClient.credentials = {
      access_token: await authClient.getAccessToken(),
    };

    const calendar = google.calendar({ version: 'v3', auth: authClient });

    const startTime = `${date}T${time}:00+01:00`;
    const endTime = calculateEndTime(date, time);
    const event = {
      summary: eventTitle,
      description: eventDescription,
      start: {
        dateTime: startTime,
      },
      end: {
        dateTime: endTime,
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'katyaklippsodermalm@gmail.com', 
      resource: event,
    });

    return response.data.id
  } catch (error) {
    console.error('ইভেন্ট যোগ করতে ব্যর্থ হয়েছে:', error);
  }
}

function calculateEndTime(date, time) {
  const [hours, minutes] = time.split(':').map(Number);
  let endHours = hours;
  let endMinutes = minutes + 30;

  if (endMinutes >= 60) {
    endHours += 1;
    endMinutes -= 60;
  }

  const endHoursStr = endHours.toString().padStart(2, '0');
  const endMinutesStr = endMinutes.toString().padStart(2, '0');
  return `${date}T${endHoursStr}:${endMinutesStr}:00+01:00`;
}

async function deleteEventFromCalendar(eventId) {
  try {

    const authClient = new GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    authClient.credentials = {
      access_token: await authClient.getAccessToken(),
    };

    const calendar = google.calendar({ version: 'v3', auth: authClient });

    await calendar.events.delete({
      calendarId: 'katyaklippsodermalm@gmail.com',
      eventId: eventId,
    });
    console.log('delteee')
  } catch (error) {
    throw error;
  }
}



module.exports = {
  addToAdminCalendar,
  deleteEventFromCalendar
    
};
