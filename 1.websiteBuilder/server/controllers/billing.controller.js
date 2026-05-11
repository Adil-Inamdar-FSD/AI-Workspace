import { PLANS } from "../config/plan.js";
import stripe from "../config/stripe.js";
import User from "../models/user.model.js"; // change path if your file name is different

export const billing = async (req, res) => {
  try {
    const { planType } = req.body;
    const userId = req.user._id;

    const plan = PLANS[planType];

    if (!plan || plan.price == 0) {
      return res.status(400).json({ message: "Invalid paid plan" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `GenWeb.ai ${planType.toUpperCase()} plan`,
            },
            unit_amount: plan.price * 100,
          },
          quantity: 1,
        },
      ],

      metadata: {
        userId: userId.toString(),
        credits: plan.credits,
        planType: planType,
      },

      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
    });

    return res.status(200).json({
      sessionUrl: session.url,
    });
  } catch (error) {
    return res.status(500).json({ message: `billing error ${error}` });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const userId = session.metadata.userId;
    const credits = Number(session.metadata.credits);

    const user = await User.findById(userId);

    user.credits += credits;
    await user.save();

    return res.status(200).json({
      message: "Credits added successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Payment verification failed ${error}`,
    });
  }
};