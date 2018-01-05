'use strict';

const nodemailer = require('nodemailer');
/* eslint-disable no-underscore-dangle */
const MODULE = 'emailService';

function emailService(config, logger) {
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        auth: {
            user: config.email.user,
            pass: config.email.password,
        },
        tls: {
            ciphers: 'SSLv3',
        },
    });
    function sendEmail(data) {
        const options = {
            subject: config.email.subject,
            from: config.email.senderName,
            to: data.broker_email,
            text: `Your calculated premium is $${data.annual_premium.toLocaleString()} for- Model: ${data.model}, Seat Capacity: ${data.seat_capacity}, Manufactured Date: ${data.manufactured_date}`,
        };
        transporter.sendMail(options, (error, info) => {
            if (error) {
                logger.error(MODULE, error);
            } else {
                logger.info(MODULE, `Email sent: ${info.response}`);
            }
        });
    }
    return {
        sendEmail,
    };
    /* eslint-enable no-underscore-dangle */
}
module.exports = emailService;
