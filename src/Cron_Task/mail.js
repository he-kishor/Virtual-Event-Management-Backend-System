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
    to: data.email,
    subject: `Reminder: ${data.event_name}`,
    text: `Dear ${data.users_name}, just a reminder for the event "${data.event_name}" scheduled on ${data.event_time}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${data.email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;
