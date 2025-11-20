frontend/src/components/Employeur/subscribe/Subscribe.jsx [18:71]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    },
  ];
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", localStorage.getItem("userId"))
        .single();
      setUser(data);
    };
    getUser();
  }, []);
  const handleSubscribe = async (priceId) => {
    console.log("1. Starting subscribe with priceId:", priceId);

    try {
      const response = await fetch(
        "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId,
            userId: localStorage.getItem("userId"),
          }),
        }
      );

      console.log("2. Response received:", response);
      console.log("3. Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const session = await response.json();
      console.log("4. Session data:", session);

      if (!session.url) {
        console.error("No URL in session:", session);
        alert("Error: No checkout URL received");
        return;
      }

      console.log("5. Redirecting to:", session.url);
      window.location.href = session.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Error: " + error.message);
    }
  };
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



frontend/src/components/User/subscribe/Subscribe.jsx [13:62]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    },
  ];

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", localStorage.getItem("userId"))
        .single();
      setUser(data);
    };
    getUser();
  }, []);

  const handleSubscribe = async (priceId) => {
    console.log("1. Starting subscribe with priceId:", priceId);
    try {
      const response = await fetch(
                "http://localhost:5000/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            priceId,
            userId: localStorage.getItem("userId"),
          }),
        }
      );
      console.log("2. Response received:", response);
      console.log("3. Response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const session = await response.json();
      console.log("4. Session data:", session);
      if (!session.url) {
        console.error("No URL in session:", session);
        alert("Error: No checkout URL received");
        return;
      }
      console.log("5. Redirecting to:", session.url);
      window.location.href = session.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert("Error: " + error.message);
    }
  };
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



