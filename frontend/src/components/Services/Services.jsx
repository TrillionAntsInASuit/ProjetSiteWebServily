import { supabase } from "../../../util/supabaseClient";
import { useState, useEffect } from "react";
import "./Services.css";

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
          const percentage = (service.nbMembres / service.maxMembres) * 100;
          const isFull = service.nbMembres >= service.maxMembres;

          return (
            <div key={service.id} className="service-card">
              <h2>{service.name}</h2>
              <p className="service-type">Type: {service.type}</p>
              
              <div className="members-info">
                <span className="members-count">
                  <strong>{service.nbMembres}</strong> / {service.maxMembres}
                </span>
              </div>

              <div className="progress-bar-container">
                <div
                  className={`progress-bar ${isFull ? 'full' : ''}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {isFull && <span className="full-badge">Full</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}