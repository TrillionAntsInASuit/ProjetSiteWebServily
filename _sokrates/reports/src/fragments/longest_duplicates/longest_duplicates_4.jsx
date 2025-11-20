<<<<<<< Updated upstream
frontend/src/components/Employeur/dashboard/Dashboard.jsx [21:37]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
              const percentage = (service.nb_membres / service.maxMembres) * 100;
              const isFull = service.nb_membres >= service.maxMembres;
=======
frontend/src/components/User/dashboard/Dashboard.jsx [77:86]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                  <h2>{service.name}</h2>
                  <p className="service-type">Type: {service.type}</p>
                  
                  <div className="members-info">
                    <span className="members-count">
                      <strong>{service.nb_membres}</strong> / {service.maxMembres}
                    </span>
                  </div>
    
                  <div className="progress-bar-container">
>>>>>>> Stashed changes
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



<<<<<<< Updated upstream
frontend/src/components/Services/Services.jsx [21:37]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
          const percentage = (service.nb_membres / service.maxMembres) * 100;
          const isFull = service.nb_membres >= service.maxMembres;
=======
frontend/src/containers/ServiceCard.jsx [10:19]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      <h2>{service.name}</h2>
      <p className="service-type">Type: {service.type}</p>

      <div className="members-info">
        <span className="members-count">
          <strong>{service.nb_membres}</strong> / {service.maxMembres}
        </span>
      </div>

      <div className="progress-bar-container">
>>>>>>> Stashed changes
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



