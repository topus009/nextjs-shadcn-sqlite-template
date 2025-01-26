import { getUsers } from "../../../../lib/db";
import { sessionOptions, withSessionRoute } from "../../../../lib/withSession";
import { ValidationResult } from "../../../../lib/validateUser";
import {areSetsEqual} from "components/lib/utils";
import {sealData} from "iron-session";

const registrationKeys = [
  "confirmPassword",
  "password",
  "email",
  "fullName",
].sort();

export default withSessionRoute(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send(ValidationResult.NotPost);
    return;
  }

  if (!areSetsEqual(new Set(Object.keys(req.body)), new Set(registrationKeys))) {
    res.status(400).send(ValidationResult.NotAllFieldsPassed);
    return;
  }

  const requestedUser = req.body as User;
  let validationResult = ValidationResult.None;

  if (
    (
      await getUsers().whereRaw(
        "LOWER(email) LIKE ?",
        `${requestedUser.email.toLowerCase()}`
      )
    ).length
  ) {
    validationResult = ValidationResult.TakenEmail;
  }

  if (validationResult !== ValidationResult.None) {
    res.status(400).send(validationResult);
    return;
  }

  const password = await sealData(requestedUser.password, sessionOptions);

  await getUsers().insert({
    ...requestedUser,
    password,
    avatar: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Photos.png",
    isAdmin: false,
  });

  res.status(200).send(validationResult);
});
