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
  };
  await transporter.sendMail(mailOptions);

  console.log("mail sent");
};
