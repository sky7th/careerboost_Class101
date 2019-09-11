const nodemailer = require('nodemailer');

function sendMail(email, subject, html) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.SENDEMAIL_EMAIL,
            pass: process.env.SENDEMAIL_PASS
        }
    });
    const mailOptions = {
        from: process.env.SENDEMAIL_EMAIL,
        to: email,
        subject,
        html
    };
    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendMail;