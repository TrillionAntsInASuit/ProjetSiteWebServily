frontend/src/components/Employeur/dashboard/Dashboard.jsx [6:13]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [services, setServices] = useState([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        getServices();
      }, []);
    
      const getServices = async () => {
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



frontend/src/components/Services/Services.jsx [6:13]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices();
  }, []);

  const getServices = async () => {
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



