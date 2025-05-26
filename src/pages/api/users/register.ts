import { getUser, db, initializeTables } from "../../../../lib/db";
import { sessionOptions, withSessionRoute } from "../../../../lib/withSession";
import { ValidationResult } from "../../../../lib/validateUser";
import { areSetsEqual } from "../../../lib/utils";
import { sealData } from "iron-session";

const registrationKeys = [
  "confirmPassword",
  "password",
  "email",
  "fullName",
].sort();

export default withSessionRoute(async (req, res) => {
  try {
    // Ensure database tables exist
    await initializeTables();

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

    // Check if passwords match
    if (req.body.password !== req.body.confirmPassword) {
      res.status(400).send(ValidationResult.InvalidPassword);
      return;
    }

    // Check if email already exists
    const existingUser = await getUser(requestedUser.email.toLowerCase()).first();
    if (existingUser) {
      validationResult = ValidationResult.TakenEmail;
    }

    if (validationResult !== ValidationResult.None) {
      res.status(400).send(validationResult);
      return;
    }

    const password = await sealData(requestedUser.password, sessionOptions);

    await db("users").insert({
      email: requestedUser.email,
      fullName: requestedUser.fullName,
      password,
      avatar: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Photos.png",
      isAdmin: false,
    });

    res.status(200).send(validationResult);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send(ValidationResult.None);
  }
});
