frontend/src/components/Services/Services.jsx [73:85]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



frontend/src/components/User/dashboard/Dashboard.jsx [75:87]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



