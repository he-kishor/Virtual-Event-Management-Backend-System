const nodemailer = require("nodemailer");
require('dotenv').config();
async function sendEmail(data) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.app_email,
      pass: process.env.app_email_pass,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: `Reminder: ${event.title}`,
    text: `Dear user, just a reminder for the event "${event.title}" scheduled on ${event.startTime}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;
