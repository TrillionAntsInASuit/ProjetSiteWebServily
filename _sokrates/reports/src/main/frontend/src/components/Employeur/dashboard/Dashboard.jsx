    import { supabase } from "../../../../util/supabaseClient.js";
    import { useState, useEffect } from "react";
    import { Link } from "react-router-dom";
    import ServiceCard from "../../../containers/ServiceCard.jsx";
const DashboardEmployeur = () => {
  const [services, setServices] = useState([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        getServices();
      }, []);
    
      const getServices = async () => {
        const { data, error } = await supabase.from("services").select("*").filter('creatorId', 'eq', localStorage.getItem("userId"));
        if (error) {
          console.error("Supabase select error:", error);
        }
        setServices(data || []);
        setLoading(false);
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
  const handleDelete = async () => {
    // your existing delete logic
  };

  return (
    <ServiceCard
      key={service.id}
      service={service}
      userType="employeur"
      onDelete={handleDelete}
      editLink={`/edit/${service.id}`}
    />
  );
})}

          </div>
        </div>
      );
    }

export default DashboardEmployeur;
