import { withSessionRoute } from "../../../../lib/withSession";

export default withSessionRoute(async (req, res) => {
  try {
    req.session.id = undefined;
    req.session.destroy();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during logout" });
  }
});
