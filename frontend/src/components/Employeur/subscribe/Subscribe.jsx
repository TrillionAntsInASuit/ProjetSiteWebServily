import SubscribeCard from "../../../containers/SubscribeCard";

const plan = {
  name: "Membership",
  price: "$9.99",
  priceId: "price_1SLTFyE9u0y3XuLvracqlHZ6",
  features: [
    "Post unlimited job listings",
    "Access to resume database",
    "Advanced analytics and reporting",
    "Priority customer support",
  ],
};

const SubscribeEmployeur = () => <SubscribeCard plan={plan} showTestButton={true} />;

export default SubscribeEmployeur;