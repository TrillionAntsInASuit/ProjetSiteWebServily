import { supabase } from "../../../util/supabaseClient";
import { useState, useEffect } from "react";
import ServiceCard from "../../containers/ServiceCard";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
    const { data, error } = await supabase.from("services").select("*");
    if (error) {
      console.error("Supabase select error:", error);
    }
    setServices(data || []);
    setLoading(false);
    console.log(data);
  };

  if (loading) {
    return (
      <div className="services-container">
        <p className="loading">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="services-container">
      <h1>Available Services</h1>
      <div className="services-list">


{services.map((service) => {
  const handleJoin = async () => {
    // your existing join logic
  };

  return (
    <ServiceCard
      key={service.id}
      service={service}
      userType={localStorage.getItem("userType")}
      onJoin={handleJoin}
    />
  );
})}
      </div>
    </div>
  );
}
