const filterCVFromJD = require("../shared/filterCVFromJD")
// const fs = require('fs');
// const htmlContent = fs.readFileSync('sentBody.html', 'utf8');

async function sendEmail(json, email) {
    // let link_cv = []
    // filterCVFromJD(json.requirements, "").then((result) => {
    //     for (const item of result) {
    //         link_cv.push(item.title)
    //     }
    //   })
    // console.log(link_cv)
      
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
        to: email,
        subject: 'Suggested CV for ' + json.title +'from Share-CV',
        text: `Dear esteemed company,

I hope this email finds you well. I am writing to suggest a CV that I believe would be suitable for the ` + json.title + ` at your company.

Thank you for considering this suggested CV for the ` + json.title + `. I believe that the candidate's skills, experience, and passion for delivering exceptional results make them a strong fit for your organization.

Best regards,

Share-CV (share-cv.vercel.app)
`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

module.exports = sendEmail;

// Dữ liệu JSON
const data = {
    id: 2031769,
    title: 'Project leader (Java Spring Web)',
    skills_arr: [ 'Java', 'Project Leader', 'Java Spring' ],
    requirements_arr: [ [Object], [Object], [Object], [Object] ],
    detail_url: 'https://topdev.vn/companies/ntt-data-vietnam-81445',
    url_company: 'https://www.nttdata.com/vn/en/',
    requirements: `Bachelor's or Master's degree in Computer Science, IT or related field. intern experience in PHP development or related field.`,
    email_company: 'duchuydeptrainhatthegioi@gmail.com'
}
  
sendEmail(data, data.email_company).then((result) => {
  console.log(result)
})
