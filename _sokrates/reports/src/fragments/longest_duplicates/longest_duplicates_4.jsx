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
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



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
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



