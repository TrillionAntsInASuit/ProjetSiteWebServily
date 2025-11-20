frontend/src/components/Services/Services.jsx [15:21]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    if (error) {
      console.error("Supabase select error:", error);
    }
    setServices(data || []);
    setLoading(false);
    console.log(data);
  };
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



frontend/src/components/User/dashboard/Dashboard.jsx [41:48]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  if (error) {
    console.error("Supabase select error:", error);
  }

  setServices(data || []);
  setLoading(false);
  console.log(data);
};
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



