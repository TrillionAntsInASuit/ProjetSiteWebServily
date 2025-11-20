<<<<<<< Updated upstream
frontend/src/components/Employeur/dashboard/Dashboard.jsx [54:75]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
=======
frontend/src/components/Employeur/dashboard/Dashboard.jsx [6:13]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [services, setServices] = useState([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        getServices();
      }, []);
    
      const getServices = async () => {
>>>>>>> Stashed changes
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



<<<<<<< Updated upstream
frontend/src/components/User/dashboard/Dashboard.jsx [72:93]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
=======
frontend/src/components/Services/Services.jsx [6:13]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
>>>>>>> Stashed changes
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



