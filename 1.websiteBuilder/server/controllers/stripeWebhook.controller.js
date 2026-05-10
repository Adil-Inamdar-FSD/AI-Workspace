import stripe from "../config/stripe.js";
import User from "../models/user.model.js";

export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRETE,
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "webhook error" });
  }
  if (event.type == "chekout.session.completed") {
    const session = event.data.object;
    const userId = session.metaData.userId;
    const credits = Number(session.metaData.userId);
    const plan = session.metaData.plan;

    await User.findByIdAndUpdate(userId, {
      $inc: { credits },
      plan,
    });
  }
  return res.json({ recieved: true });
};
