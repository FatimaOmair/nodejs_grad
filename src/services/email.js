import nodemailer from "nodemailer";
const sendEmail = async (dest, subject, message) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: dest, 
    subject: subject,
    html: message, 
  });
};

export default sendEmail;