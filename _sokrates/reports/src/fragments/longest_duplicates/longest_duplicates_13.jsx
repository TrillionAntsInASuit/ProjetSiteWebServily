frontend/src/components/Services/Services.jsx [31:37]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  return (
    <div className="services-container">
      <h1>Available Services</h1>
      <div className="services-list">
        {services.map((service) => {
          const percentage = (service.nb_membres / service.maxMembres) * 100;
          const isFull = service.nb_membres >= service.maxMembres;
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



frontend/src/components/User/dashboard/Dashboard.jsx [50:56]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  return (
        <div className="services-container">
          <h1>Available Services</h1>
          <div className="services-list">
            {services.map((service) => {
              const percentage = (service.nb_membres / service.maxMembres) * 100;
              const isFull = service.nb_membres >= service.maxMembres;
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



