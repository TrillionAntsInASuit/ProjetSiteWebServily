import Stripe from 'stripe';
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res, next) => {
  try {
    console.log("Received priceId:", req.body.priceId);
    const { priceId, userId } = req.body; 
    
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
      success_url: '"http://localhost:5000',
      cancel_url: '"http://localhost:5000/subscribe',
      metadata: {
    userId: userId
  }
    });
    
    res.json({ url: session.url });

  } catch (err) {
    console.error("Stripe error:", err); // More detailed error log
    res.status(500).json({ error: err.message }); // Return error to frontend
  }
};
export const handleStripeWebhook = async (req, res) => {
  console.log("Webhook received with signature:", req.headers["stripe-signature"]);
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    
    console.log('Payment successful for user:', userId);
    
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_KEY
      );
      
      await supabase
        .from('users')
        .update({ estAbonne: true })
        .eq('id', userId);
      
      console.log('User subscription updated');
    } catch (dbError) {
      console.error('Database error:', dbError);
    }
  }
  
  res.json({ received: true });
};