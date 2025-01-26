import { db, getUser } from "../../../../lib/db";
import { sessionOptions, withSessionRoute } from "../../../../lib/withSession";
import { ValidationResult } from "../../../../lib/validateUser";
import {z} from "zod";
import {changePasswordFormSchema} from "../../../../lib/schema";
import { getIronSession, sealData } from 'iron-session';

type ReqBody = z.infer<typeof changePasswordFormSchema>;

export default withSessionRoute(async (req, res) => {
  if (req.method !== "POST") return res.status(405).send(ValidationResult.NotPost);

  const body: ReqBody = req.body;
  const session = await getIronSession(req, res, sessionOptions);
  let updated = false;
  const password = await sealData(body.password, sessionOptions);

  if (session?.id) {
    updated = await db("users").where("id", session?.id).first().update({ password })
  } else if (body.token) {
    const tokenItem = await db("change-password-tokens").where("changePasswordToken", body.token).first();
    if (!tokenItem) return res.status(400).send(ValidationResult.InvalidChangePasswordToken);
    updated = await getUser(tokenItem.email).first().update({ password });
    await db("change-password-tokens").where('email', tokenItem.email).del();
  }

  if (!updated) return res.status(400).send(ValidationResult.UserNotFound);
  res.status(200).send(ValidationResult.ForgotPasswordSuccess);
});
