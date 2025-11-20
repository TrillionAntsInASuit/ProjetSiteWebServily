import SubscribeCard from "../../../containers/SubscribeCard";


const plan = {
  name: "Membership",
  price: "$9.99",
  priceId: "price_1SLTFyE9u0y3XuLvracqlHZ6",
  features: ["Join unlimited jobs", "Priority customer support"],
};



const SubscribeClient = () => <SubscribeCard plan={plan} />;


export default SubscribeClient;