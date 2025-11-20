import React, { useEffect, useState } from "react";
import { supabase } from "../../../backend/util/supabaseClient";
import "./Subscribe.css";

const SubscribeCard = ({ plan, showTestButton = false }) => {
  const [user, setUser] = useState(null);

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
    try {
      const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, userId: localStorage.getItem("userId") }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const session = await response.json();
      if (!session.url) {
        alert("Error: No checkout URL received");
        return;
      }
      window.location.href = session.url;
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const testBackend = async () => {
    try {
      const response = await fetch("https://backend-3hpxq63ak-trillionantsinasuits-projects.vercel.app/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: "test_price_id", userId: "test_user_id" }),
      });
      const text = await response.text();
      alert("Response status: " + response.status);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="subscribe">
      <h1>Subscribe</h1>
      <div className="subscribe-box">
        <h2>{plan.name}</h2>
        <p className="price">{plan.price}</p>
        <p className="price-period">per month</p>
        <button onClick={() => handleSubscribe(plan.priceId)}>Subscribe Now</button>
        {showTestButton && <button onClick={testBackend}>Test Backend</button>}
      </div>
    </div>
  );
};

export default SubscribeCard;