import nodemailer from "nodemailer";


const sendMail = async (email, subject, text) => {


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use false for port 587 (TLS)
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS,
        },
    });

    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: auto; border: 1px solid #ddd; padding: 30px; background-color: #ffffff; color: #333333; line-height: 1.6;">
      <div style="text-align: center; margin-bottom: 30px;">
        <img src="https://drive.google.com/file/d/1UZ34h30m84JBcvTkVdyC6iUWWaPMP6P0/view?usp=drive_link" alt="InstaVibe Logo" style="max-width: 150px; height: auto;" />
        <h2 style="color: #336798; font-weight: 600; margin-top: 20px;">Greetings from InstaVibe!</h2>
        <p style="font-size: 16px; margin: 10px 0 0;">Reset Password</p>
       
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
      </div>
      <div style="margin: 40px 0;font-weight: 600; font-size: 15px;  margin: auto;">
        ${text}
      </div>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
      <div style="font-size: 13px; color: #888; text-align: center; margin-top: 30px;">
        <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
        <p style="margin: 5px 0 0;">© ${new Date().getFullYear()} InstaVibe. All rights reserved.</p>
      </div>
    </div>
    `;

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    return {
        info,
        message: "success",
    };
};

export default sendMail