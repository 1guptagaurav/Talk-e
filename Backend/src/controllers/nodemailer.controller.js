import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.MAIL_USERID, // Your Gmail address
    pass: process.env.MAIL_PASS, // App Password
  },
});

// Function to send an OTP email
export const sendOtpEmail = async (req) => {
  try {
    // Email content
    const { randOTP, email } = req.body;
    const info = await transporter.sendMail({
      from: `"Walk-e-Talk-e Team" <${process.env.MAIL_USERID}>`, // sender address
      to: email, // recipient email
      subject: "Your Walk-e-Talk-e OTP Code is Here!", // Subject line
      text: `Hi there,

Welcome to Walk-E-Talk-E! 

To complete your registration, please use the One-Time Password (OTP) provided below:
${randOTP}

This OTP is valid for the next 10 minutes. Please do not share this code with anyone for security reasons.

If you didn't request this OTP, please ignore this email.

We're excited to have you join the Walk-E-Talk-E community!

Best regards,
The Walk-e-Talk-e Team
`, // Plain text body
      html: `
        <p>Hi there,</p>
        <p>Welcome to <strong>Walk-E-Talk-E</strong>!</p>
        <p>To complete your registration, please use the One-Time Password (OTP) provided below:</p>
        <h2 style="color: #ff5722;">${randOTP}</h2>
        <p>This OTP is valid for the next 10 minutes. Please do not share this code with anyone for security reasons.</p>
        <p>If you didn't request this OTP, please ignore this email.</p>
        <p>We're excited to have you join the Walk-E-Talk-E community!</p>
        <br>
        <p>Best regards,<br>The Walk-e-Talk-e Team</p>
      `,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
