const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'phdhuy1@gmail.com',
        pass: 'prxb dopf rxak uemh'
    }
});

const mailOptions = {
    from: 'phdhuy1@gmail.com',
    to: 'huy.pham2002khmt@hcmut.edu.vn',
    subject: 'Hello from Node.js',
    text: 'This is the body of the email'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
  