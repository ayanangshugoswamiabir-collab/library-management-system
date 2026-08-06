const nodemailer = require("nodemailer");


const sendEmail = async (options) => {

    try {

        // Create Ethereal test account
        const testAccount = await nodemailer.createTestAccount();



        // Create transporter
        const transporter = nodemailer.createTransport({

            host: "smtp.ethereal.email",

            port: 587,

            secure: false,

            auth: {

                user: testAccount.user,

                pass: testAccount.pass

            },

            tls: {

                rejectUnauthorized: false

            }

        });



        // Email details
        const mailOptions = {

            from: "Library Management System <no-reply@library.com>",

            to: options.email,

            subject: options.subject,

            html: options.message

        };



        // Send email
        const info = await transporter.sendMail(mailOptions);



        console.log("Email sent successfully ✅");


        console.log(
            "Preview URL:",
            nodemailer.getTestMessageUrl(info)
        );



    } catch (error) {


        console.log("Email sending failed ❌");

        console.log(error.message);


        throw error;

    }

};



module.exports = sendEmail;