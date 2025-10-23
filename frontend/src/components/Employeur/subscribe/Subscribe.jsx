import "./Subscribe.css";
import "@stripe/stripe-js";

const SubscribeEmployeur = () => {

  return (
    <div className="subscribe">
      <h1>Subscribe</h1>
      <div className="subscribe-box">
        <h2>Features included: </h2>
        <ul>
          <li>Post unlimited job listings</li>
          <li>Access to resume database</li>
          <li>Advanced analytics and reporting</li>
          <li>Priority customer support</li>
        </ul>
        <button>Subscribe Now</button>
      </div>
    </div>
  );
};

export default SubscribeEmployeur;
