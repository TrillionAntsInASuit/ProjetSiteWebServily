import Stripe from 'stripe';
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { priceId } = req.body;
    
    console.log("Received priceId:", priceId); // Debug log
    console.log("Stripe key exists:", !!process.env.STRIPE_SECRET_KEY); // Debug log
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:5173/subscribe/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/subscribe/cancel',
    });
    
    res.json({ url: session.url });

  } catch (err) {
    console.error("Stripe error:", err); // More detailed error log
    res.status(500).json({ error: err.message }); // Return error to frontend
  }
};