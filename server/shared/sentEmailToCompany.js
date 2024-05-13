const filterCVFromJD = require("../shared/filterCVFromJD")
// const fs = require('fs');
// const htmlContent = fs.readFileSync('sentBody.html', 'utf8');

async function sendEmail(json, email) {
    let link_cv = []
    let suggest1 = suggest2 = suggest3 = {
        slug: '',
        summary: '',
        location: '',
        title: '',
        experience: ''
    }
    
    await filterCVFromJD(json.requirements, "").then((result) => {
        for (const item of result) {
            link_cv.push(item)
        }
        for (let i = 0; i < link_cv.length; i++) {
            if (i == 0) suggest1 = link_cv[0]
            else if (i == 1) suggest2 = link_cv[1]
            else if (i == 2) suggest3 = link_cv[2]
            else break
        }
    })
      
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'no.replyforour@gmail.com',
            pass: 'fqdq wsxh kczz fbwl'
        }
    });


    const mailOptions = {
        from: 'no.replyforour@gmail.com',
        to: email,
        subject: 'Suggested CV for ' + json.title +' position from Share-CV',
        html: `
<!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #f1f1f1;margin: 0 auto !important;padding: 0 !important;height: 100% !important;width: 100% !important;">
        <head style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <meta charset="utf-8" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"> <!-- utf-8 works for most cases -->
            <meta name="viewport" content="width=device-width" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"> <!-- Forcing initial-scale shouldn't be necessary -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"> <!-- Use the latest (edge) version of IE rendering engine -->
            <meta name="x-apple-disable-message-reformatting" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
            <title style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
            <!-- CSS Reset : BEGIN -->
            <!-- CSS Reset : END -->
            <!-- Progressive Enhancements : BEGIN -->
        
        
        
        </head>
        
        <body width="100%" style="margin: 0 auto !important;padding: 0 !important;mso-line-height-rule: exactly;background-color: #f1f1f1;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #f1f1f1;font-family: 'Lato', sans-serif;font-weight: 400;font-size: 15px;line-height: 1.8;color: rgba(0,0,0,.4);height: 100% !important;width: 100% !important;">
            <center style="width: 100%;background-color: #f1f1f1;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                <div style="display: none;font-size: 1px;max-height: 0px;max-width: 0px;opacity: 0;overflow: hidden;mso-hide: all;font-family: sans-serif;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
                </div>
                <div style="max-width: 600px;margin: 0 auto;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="email-container">
                    <!-- BEGIN BODY -->
                    <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;">
        
                        <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <td valign="middle" class="hero bg_white" style="padding: 3em 0 2em 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #ffffff;position: relative;z-index: 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                <img style="max-width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;-ms-interpolation-mode: bicubic;" src="https://visme.co/blog/wp-content/uploads/2022/01/How-to-Deliver-a-Winning-Interview-Presentation-Header.jpg" alt="">
                            </td>
                        </tr>
                        <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #ffffff;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                                    <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                        <td class="logo" style="text-align: center;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                            <h1 style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Lato', sans-serif;color: #000000;margin-top: 0;font-weight: 400;margin: 0;">
                                                <a href="https://share-cv.vercel.app/" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-decoration: none;color: #6265de;font-size: 24px;font-weight: 700;font-family: 'Lato', sans-serif;">SHARE-CV</a>
                                            </h1>                                        
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr><!-- end tr -->
                        <!-- end tr -->
                        <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #ffffff;position: relative;z-index: 0;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                <table style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                                    <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                        <p style="color: #000000;margin-left: 30px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">Dear Recruiting Team,</p>
                                    </tr>
                                    <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                        <p style="color: #000000;margin-left: 30px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"> I hope this email finds you well. I am writing to suggest CVs that I believe would be suitable for the ` + json.title + ` at your company.</p>
                                        <a href="https://share-cv.vercel.app/`+ suggest1.slug + `" style="color: blue;margin-left: 30px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"> ` + suggest1.title + ` </a>
                                        <p style="color: #000000;margin-left: 30px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-align: justify;margin-right: 15px"><em>`+ suggest1.summary + `</em></p>
                                        <a href="https://share-cv.vercel.app/`+ suggest2.slug + `" style="color: blue;margin-left: 30px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"> ` + suggest2.title + ` </a>
                                        <p style="color: #000000;margin-left: 30px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-align: justify;margin-right: 15px"><em>`+ suggest2.summary + `</em></p>
                                        <a href="https://share-cv.vercel.app/`+ suggest3.slug + `" style="color: blue;margin-left: 30px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"> ` + suggest3.title + ` </a>
                                        <p style="color: #000000;margin-left: 30px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-align: justify;margin-right: 15px"><em>`+ suggest3.summary + `</em></p>
                                        <p style="color: #000000;margin-left: 30px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;"> Thank you for considering this suggested CV for the ` + json.title + `. I believe that the candidate's skills, experience, and passion for delivering exceptional results make them a strong fit for your organization.</p>
                                    </tr>
                                    <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                        <p style="color: #000000;margin-left: 30px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">Best regards.</p>
                                    </tr>
        
                                </table>
                                <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;">
                                    <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                        <td valign="middle" class="bg_light footer email-section" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background: #f0f0f0;padding: 2.5em;border-top: 1px solid #6265de;color: rgba(0,0,0,.5);mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                            <table style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                                                <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                    <td valign="top" width="33.333%" style="padding-top: 20px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                                                            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                <td style="text-align: left;padding-right: 10px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                                                    <h3 class="heading" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Lato', sans-serif;color: #6265de;margin-top: 0;font-weight: 400;font-size: 20px;">About</h3>
                                                                    <p style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">The Share-CV website is a recruitment networking platform that supports both job seekers and employers.</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td valign="top" width="33.333%" style="padding-top: 20px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                                                            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                <td style="text-align: left;padding-left: 5px;padding-right: 5px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                                                    <h3 class="heading" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Lato', sans-serif;color: #6265de;margin-top: 0;font-weight: 400;font-size: 20px;">Contact Info</h3>
                                                                    <ul style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
                                                                        <li style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;list-style: none;margin-bottom: 10px;"><span class="text" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: rgba(0,0,0,.3);">Rooms 506 and 709, AH Building, Ta Quang Buu Street, Ward 6, Linh Trung Ward, Thu Duc City, Ho Chi Minh City.</span></li>
                                                                        <li style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;list-style: none;margin-bottom: 10px;"><span class="text" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;color: rgba(0,0,0,.3);">+84 358035821 </span></li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td valign="top" width="33.333%" style="padding-top: 20px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;border-spacing: 0 !important;border-collapse: collapse !important;table-layout: fixed !important;margin: 0 auto !important;">
                                                            <tr style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                                                <td style="text-align: left;padding-left: 10px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;mso-table-lspace: 0pt !important;mso-table-rspace: 0pt !important;">
                                                                    <h3 class="heading" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-family: 'Lato', sans-serif;color: #6265de;margin-top: 0;font-weight: 400;font-size: 20px;">Useful Links</h3>
                                                                    <ul style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;margin: 0;padding: 0;">
                                                                        <li style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;list-style: none;margin-bottom: 10px;"><a href="https://share-cv.vercel.app/" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-decoration: none;color: #6265de;">Home</a></li>
                                                                        <li style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;list-style: none;margin-bottom: 10px;"><a href="https://share-cv.vercel.app/about" style="-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;text-decoration: none;color: #6265de;">About</a></li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr><!-- end: tr -->
                                </table>
        
                            </td>
                        </tr>
                    </table>
                </div>
            </center>
        </body>
        </html>
`        
//         text: `Dear esteemed company,

// I hope this email finds you well. I am writing to suggest a CV that I believe would be suitable for the ` + json.title + ` at your company.

// Thank you for considering this suggested CV for the ` + json.title + `. I believe that the candidate's skills, experience, and passion for delivering exceptional results make them a strong fit for your organization.

// Best regards,

// Share-CV (share-cv.vercel.app)
// `
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

// // Dữ liệu JSON
// const data = {
//     id: 2031769,
//     title: 'Project leader (Java Spring Web)',
//     skills_arr: [ 'Java', 'Project Leader', 'Java Spring' ],
//     requirements_arr: [ [Object], [Object], [Object], [Object] ],
//     detail_url: 'https://topdev.vn/companies/ntt-data-vietnam-81445',
//     url_company: 'https://www.nttdata.com/vn/en/',
//     requirements: `Bachelor's or Master's degree in Computer Science, IT or related field. intern experience in PHP development or related field.`,
//     email_company: 'duchuydeptrainhatthegioi@gmail.com'
// }
  
// sendEmail(data, data.email_company).then((result) => {
//   console.log(result)
// })
