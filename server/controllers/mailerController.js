import nodemailer from "nodemailer";
import Mailgen from "mailgen";

import ENV from "../config.js";

let mailConfig = {
    service: "gmail",
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
};

let transporter = nodemailer.createTransport(mailConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "Mahasona",
        link: 'https://mailgen.js/'
    }
});


/** POST: http://localhost:4040/api/registerMail
 * @param : {
  "name": "Test 01"
  "userEmail": "user01@gmail.com",
  "text": "",
  "subject": ""
  }
*/
export const registerMail = async (req, res) => {
    const { name, userEmail, text, subject } = req.body;

    // body of the email
    let email = {
        body: {
            name,
            intro: text || "Welcome to Haunted House! We're very excited to have you on board.",
            outro: "Need help, or have question? Just reply to this email, we'd love to help."
        }
    }

    let emailBody = MailGenerator.generate(email);

    let massage = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successfully",
        html: emailBody
    }

    // send mail
    transporter.sendMail(massage).then(() => {
        return res.status(200).send({ msg: "You should receive an email from us." });
    }).catch(error => res.status(500).send({ error }));
}