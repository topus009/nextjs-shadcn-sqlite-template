import {unsealData} from "iron-session";
import { getUser, initializeTables } from "../../../../lib/db";
import { sessionOptions, withSessionRoute } from "../../../../lib/withSession";

export default withSessionRoute(async (req, res) => {
  try {
    // Ensure database tables exist
    await initializeTables();

    if (req.method !== "POST") {
      res.status(405).send("");
      return;
    }

    if (!req.body || !req.body.email || !req.body.password) {
      res.status(400).send("Email and password are required");
      return;
    }

    const user = await getUser(req.body.email).first() as User;

    if (!user) {
      res.status(403).send("Wrong email or password");
      return;
    }

    const userPassword = await unsealData(user.password, sessionOptions)

    if (userPassword !== req.body.password) {
      res.status(403).send("Wrong email or password");
      return;
    }

    req.session.id = user!.id;
    await req.session.save();
    res.status(200).send("");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error");
  }
});
