// import "body-parser"
import { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer"

export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
    const { name, email, approve } = req.body;
    if (name === '' || email === '') {
        return;
    }
    
    const transporter = createTransport({
        // Specify your email provider details here
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false,
        },
        auth: {
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS
        }
    });

    const mailOptions = {
        from: "dotzflix@outlook.com",
        to: 'toiznerd@gmail.com', // Replace with your email address
        subject: 'New User in Dotzflix!',
        text: `
            Name: ${name}
            Email: ${email}
            Please accept me as a friend of your
        `
    };

    const mailOptionsToVerify = {
        from: "dotzflix@outlook.com",
        to: email, // Replace with your email address
        subject: 'Welcome to Dotzflix!',
        text: `
            Hi ${name}!
            You have been verified as Dotz friend!
            Enjoy!
        `
    }

    transporter.sendMail(approve ? mailOptionsToVerify : mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.statusCode = 500
            res.json({message: "Error sending email"})
        } else {
            console.log('Email sent:', info.response);
            res.statusCode = 200
            res.json({message: "Email sent successfully"})
        }
    });

    
}