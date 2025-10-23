import { useState, useEffect } from "react";
import { supabase } from "../../../../util/supabaseClient.js";

const Edit = () => {
  const [serviceId, setServiceId] = useState(null);
  const [membres, setMembres] = useState([]);
  const getMembres = async () => {
    const { data, error } = await supabase.from("serviceMembres").select("userId").eq("service_id", serviceId);
    if (error) {
      console.error("Supabase select error:", error);
      return [];
    }
    return data.map((record) => record.userId);
  };

  useEffect(() => {
    getMembres();
  }, []);

  return (
    <div>
      <h1>Edit Job Listing</h1>
      <p>Select a listing to update or modify its details.</p>
    </div>
  );
};

export default Edit;
