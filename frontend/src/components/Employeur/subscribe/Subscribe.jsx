import { useEffect, useState } from "react";
import { supabase } from "../../../../../backend/util/supabaseClient";
import "./Subscribe.css";

const SubscribeEmployeur = () => {
  const [user, setUser] = useState(null);
  const plans = [
    {
      name: "Membership",
      price: "$9.99",
      priceId: "price_1SLTFyE9u0y3XuLvracqlHZ6",
      features: [
        "Post unlimited job listings",
        "Access to resume database",
        "Advanced analytics and reporting",
        "Priority customer support",
      ],
    },
  ];
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", localStorage.getItem("userId"))
        .single();
      setUser(data);
    };
    getUser();
  }, []);
  const handleSubscribe = async (priceId) => {
    console.log("1. Starting subscribe with priceId:", priceId);

    try {
      const response = await fetch(
        "https://prjetwebbackend.vercel.app/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId,
            userId: localStorage.getItem("userId"),
          }),
        }
      );

      console.log("2. Response received:", response);
      console.log("3. Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const session = await response.json();
      console.log("4. Session data:", session);

      if (!session.url) {
        console.error("No URL in session:", session);
        alert("Error: No checkout URL received");
        return;
      }

      console.log("5. Redirecting to:", session.url);
      window.location.href = session.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Error: " + error.message);
    }
  };


const testBackend = async () => {
  try {
    const response = await fetch(
      "https://backend-3hpxq63ak-trillionantsinasuits-projects.vercel.app/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: "test_price_id",
          userId: "test_user_id",
        }),
      }
    );

    const text = await response.text();
    console.log("✅ Backend response:", text);
    alert("Response status: " + response.status);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    alert("Error: " + error.message);
  }
};
  return (
    <div className="subscribe">
      <h1>Subscribe</h1>
      <div className="subscribe-box">
        <h2>{plans[0].name}</h2>
        <p className="price">{plans[0].price}</p>
        <p className="price-period">per month</p>
        <button onClick={() => handleSubscribe(plans[0].priceId)}>
          Subscribe Now
        </button>
        <button onClick={testBackend}>Test Backend</button>
      </div>
    </div>
  );
};

export default SubscribeEmployeur;
