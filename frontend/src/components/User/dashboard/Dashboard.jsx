    import { supabase } from "../../../../util/supabaseClient.js";
    import { useState, useEffect } from "react";
    import { Link } from "react-router-dom";
    import React from "react";

const DashboardClient = () => {
  const [services, setServices] = useState([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        getServices();
      }, []);
    
  const getServicesClient = async () => {
  const { data, error } = await supabase
    .from("serviceMembres")
    .select("service_id")
    .eq("userId", localStorage.getItem("userId"));

  if (error) {
    console.error("Supabase select error:", error);
    return [];
  }

  return data.map((record) => record.service_id);
};

const getServices = async () => {
  const serviceIds = await getServicesClient();

  if (!serviceIds.length) {
    setServices([]);
    setLoading(false);
    return;
  }

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .in("id", serviceIds);

  if (error) {
    console.error("Supabase select error:", error);
  }

  setServices(data || []);
  setLoading(false);
  console.log(data);
};
    
  return (
        <div className="services-container">
          <h1>Available Services</h1>
          <div className="services-list">
            {services.map((service) => {
              const percentage = (service.nb_membres / service.maxMembres) * 100;
              const isFull = service.nb_membres >= service.maxMembres;
              const handleLeave = async () => {
                const userId = localStorage.getItem("userId");

                const { error } = await supabase
                  .from("serviceMembres")
                  .delete()
                  .eq('userId', userId)
                  .eq('service_id', service.id);
            
                if (error) {
                  console.error("Error leaving service:", error.message);
                  alert("Failed to leave the service. Please try again.");
                } else {
                  alert("Successfully left the service!");
                  getServices();
              }
            }
    
              return (
                <div key={service.id} className="service-card">
                  <h2>{service.name}</h2>
                  <p className="service-type">Type: {service.type}</p>
                  
                  <div className="members-info">
                    <span className="members-count">
                      <strong>{service.nb_membres}</strong> / {service.maxMembres}
                    </span>
                  </div>
    
                  <div className="progress-bar-container">
                    <div
                      className={`progress-bar ${isFull ? 'full' : ''}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
    
                  {isFull && <span className="full-badge">Full</span>}
  
                  <button className="deleteBtn" onClick={handleLeave}>Leave</button>
                  
                </div>
              );
            })}
          </div>
        </div>
      );
    }

export default DashboardClient;
