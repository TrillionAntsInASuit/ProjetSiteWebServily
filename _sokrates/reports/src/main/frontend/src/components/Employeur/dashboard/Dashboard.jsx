    import { supabase } from "../../../../util/supabaseClient.js";
    import { useState, useEffect } from "react";
<<<<<<< Updated upstream
    import "./Dashboard.css";
    import { Link } from "react-router-dom";

=======
    import { Link } from "react-router-dom";
    import ServiceCard from "../../../containers/ServiceCard.jsx";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              const percentage = (service.nb_membres / service.maxMembres) * 100;
              const isFull = service.nb_membres >= service.maxMembres;

              const handleDelete = async () => {
                const confirmDelete = window.confirm("Es-tu sûr de vouloir effacer ce service?");
    
                if (confirmDelete) {
                  const { error } = await supabase
                    .from('services')
                    .delete()
                    .eq('id', service.id);

                  if (error) {
                    console.error('Delete failed:', error.message);
                  } else {
                    console.log('Service deleted successfully');
                    getServices();
                  }
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
                  <Link to={`/edit/${service.id}`}><button className="editBtn">Edit</button></Link>
                  <button className="deleteBtn" onClick={handleDelete}>Delete</button>
                </div>
              );
            })}
=======
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

>>>>>>> Stashed changes
          </div>
        </div>
      );
    }

export default DashboardEmployeur;
