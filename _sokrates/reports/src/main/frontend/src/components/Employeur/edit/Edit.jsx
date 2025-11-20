import { useState, useEffect } from "react";
import { supabase } from "../../../../util/supabaseClient.js";
import { useParams } from "react-router-dom";
import "./Edit.css";

const Edit = () => {
  const { serviceId } = useParams();
  const [membres, setMembres] = useState([]);
  const getMembres = async () => {
    const { data, error } = await supabase
      .from("serviceMembres")
      .select("userId")
      .eq("service_id", serviceId);
    if (error) {
      console.error("Supabase select error:", error);
      return [];
    }
    const userIds = data.map((record) => record.userId);
    const { data: usersData, error: usersError } = await supabase
      .from("users")
      .select("*")
      .in("id", userIds);
    setMembres(usersData);
  };

  useEffect(() => {
    getMembres();
  }, []);

  return (
    <div className="edit-container">
      <h1>Enlève des clients</h1>
      <div className="edit-list">
        {membres.map((membre) => {
          const handleEnlever = async () => {
            const confirmDelete = window.confirm(
              "Es-tu sûr de vouloir effacer ce membre?"
            );

            if (confirmDelete) {
              const { error } = await supabase
                .from("serviceMembres")
                .delete()
                .eq("userId", membre.id)
                .eq("service_id", serviceId);

              if (error) {
                console.error("Delete failed:", error.message);
              } else {
                console.log("Membre effacé avec succès");
                getMembres();
              }
            }
          };

          return (
            <div className="edit-card" key={membre.id}>
              <p>{membre.name}</p>
              <p>{membre.email}</p>
              <button className="enleve-bouton" onClick={handleEnlever}>
                Enlever
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Edit;
