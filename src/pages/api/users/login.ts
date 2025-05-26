import {unsealData} from "iron-session";
import { getUser } from "../../../../lib/db";
import { sessionOptions, withSessionRoute } from "../../../../lib/withSession";

export default withSessionRoute(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("");
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
});
