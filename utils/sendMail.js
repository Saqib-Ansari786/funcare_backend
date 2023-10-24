import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendMail = async (email, verification_code) => {
  const mailOptions = {
    from: process.env.GMAIL_ID,
    to: email,
    subject: "Playland App User Verification Code",
    text: "Verification Code",
    html: `<h1>Verification Code</h1><p>${verification_code}</p>
    <p>Verification Code will expire in 1.5 minutes</p>
    <p>Thank you for using our application</p>
    <p>Regards,</p>
    <p>Team Playland</p>
    `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
};
