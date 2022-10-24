import { createTransport, getTestMessageUrl } from "nodemailer";

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string): string {
  return `
        <div style="
            border: 1px solid black;
            padding: 20px;
            font-family: sans-serif;
            line-height: 2;
            font-size: 20px;
        ">
            <h2>Hello there</h2>
            <p>${text}</p>
        </div>
    `;
}

interface MailResponse {
  message: string;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info: MailResponse = (await transport.sendMail({
    to,
    from: "scott_schubert@hotmail.com.au",
    subject: "Your password reset token",
    html: makeANiceEmail(`Your password reset token is here
            <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Reset</a>
        `),
  })) as MailResponse;

  console.log(info);
  if (process.env.MAIL_USER.includes("ethereal.email")) {
    console.log(`💌 message sent. ${getTestMessageUrl(info)}`);
  }
}
