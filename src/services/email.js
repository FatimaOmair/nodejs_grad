import nodemailer from "nodemailer";

const sendEmail = async (dest, subject, m ,message) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let htmlTemplate = `
  
  <html>
<head>
  <style>
    /* CSS styles for your email template */
    body {
      font-family: Arial, sans-serif;
      background-color: #573e66;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #573e66; /* Purple */
      color: #fff;
      padding: 20px;
      text-align: center;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .content {
      padding: 20px;
    }
    .footer {
      background-color: #573e66; /* Purple */
      color: #fff;
      padding: 20px;
      text-align: center;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .graduation-img {
      width: 150px; /* Adjust the size as needed */
      float: right; /* Align the image to the right */
      margin-left: 20px; /* Add some spacing between the image and paragraphs */
      margin-top: 20px; /* Add some spacing between the image and paragraphs */
    }
    .text-left {
      text-align: left; /* Align paragraphs to the left */
    }
    @keyframes slideIn {
      from {
        transform: translateY(-50px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    .animated {
      animation: slideIn 0.5s ease-in-out;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>GMS Technical Support!</h1>
    </div>
    <div class="content animated">
      <img src="https://media.gettyimages.com/id/1423774582/vector/graduation-send-off-green-suit-building-background.jpg?s=612x612&w=gi&k=20&c=WrcCvbY6w13ofbotWs1eLoEzqWEcVDyLG4FTmQGrEzU=" alt="Graduation Icon" class="graduation-img">
      <p class="text-left">Hello,</p>
      <p class="text-left"><strong>${m}.</strong></p>
      <p class="text-left">I want to talk about: ${subject}</p>
      <p class="text-left">${message}</p>
    </div>
    <div class="footer">
      <p> [Palestine Technical University Khadoorie]</p>
      <p>${dest}</p>
    </div>
  </div>
</body>
</html>
  `;

  let info = await transporter.sendMail({
    from: dest, // Set the sender email address here
    to:process.env.EMAIL, // Send the email only to the admin's email address
    subject: subject,
    html: htmlTemplate, 
  });
};

export default sendEmail;



export const sendEmail2 = async (dest, subject ,message) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    secureConnection:false,
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let htmlTemplate = `
  
  <html>
<head>
  <style>
    /* CSS styles for your email template */
    body {
      font-family: Arial, sans-serif;
      background-color: #573e66;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #573e66; /* Purple */
      color: #fff;
      padding: 20px;
      text-align: center;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .content {
      padding: 20px;
    }
    .footer {
      background-color: #573e66; /* Purple */
      color: #fff;
      padding: 20px;
      text-align: center;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .graduation-img {
      width: 150px; /* Adjust the size as needed */
      float: right; /* Align the image to the right */
      margin-left: 20px; /* Add some spacing between the image and paragraphs */
      margin-top: 20px; /* Add some spacing between the image and paragraphs */
    }
    .text-left {
      text-align: left; /* Align paragraphs to the left */
    }
    @keyframes slideIn {
      from {
        transform: translateY(-50px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    .animated {
      animation: slideIn 0.5s ease-in-out;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>GMS Announcement!</h1>
    </div>
    <div class="content animated">
      <img src="https://media.gettyimages.com/id/1423774582/vector/graduation-send-off-green-suit-building-background.jpg?s=612x612&w=gi&k=20&c=WrcCvbY6w13ofbotWs1eLoEzqWEcVDyLG4FTmQGrEzU=" alt="Graduation Icon" class="graduation-img">
      <p class="text-left">Hello,</p>
      <p class="text-left">${subject}</p>
      <p class="text-left">${message}</p>
    </div>
    <div class="footer">
      <p> [Palestine Technical University Khadoorie]</p>
      <p>${dest}</p>
    </div>
  </div>
</body>
</html>
  `;

  let info = await transporter.sendMail({
    from: process.env.EMAIL, // Set the sender email address here
    to: dest, // Send the email only to the admin's email address
    subject: subject,
    html: htmlTemplate, 
  });
};

