import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

async function afterCallback(req, res, session, state) {
  if (session.user) {
    // upsert user
    await dbConnect();
    await User.findOneAndUpdate({ sub: session.user.sub }, session.user, {
      upsert: true,
      new: true,
    });
    return session;
  } else {
    res.status(401).end("User is not admin");
  }
}

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error) {
      res.status(error.status || 500).end(error.message);
    }
  },
});
