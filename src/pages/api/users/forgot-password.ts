import { db, getUser } from "../../../../lib/db";
import { withSessionRoute } from "../../../../lib/withSession";
import { ValidationResult } from "../../../../lib/validateUser";
import { Resend } from 'resend';
import { EmailTemplate } from '../../../components/change-password-magic-link-template';
import {sealData} from "iron-session";

const resend = new Resend(process.env.RESEND_TOKEN);

export default withSessionRoute(async (req, res) => {
  try {
    if (req.method !== "POST") return res.status(405).send(ValidationResult.NotPost);

    if (!req.body || !req.body.email) {
      return res.status(400).send(ValidationResult.NotAllFieldsPassed);
    }

    const requestedUser = req.body as User;
    const email = requestedUser.email.toLowerCase();
    const user = await getUser(email).first();

    if (!user) return res.status(400).send(ValidationResult.UserNotFound);

    const changePasswordToken = await sealData(email, { password: process.env.CHANGE_PASSWORD_SECRET });

    const template = await EmailTemplate({ href: `http://localhost:3000/change-password?token=${changePasswordToken}` });
    await db("change-password-tokens").insert({ email, changePasswordToken });
    const {error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [process.env.RESEND_MAIL_TO],
      subject: 'Change password Magic Link',
      react: template,
    });

    if (error) {
      const isResendFailedConnectionError = error.message === 'API key is invalid';
      return res.status(400).send(isResendFailedConnectionError ? ValidationResult.ResendConnectionError : ValidationResult.ResendUnhandledError);
    }

    res.status(200).send(ValidationResult.ForgotPasswordSuccess);
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).send(ValidationResult.ResendUnhandledError);
  }
});
