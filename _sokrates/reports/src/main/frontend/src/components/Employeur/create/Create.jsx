import { useState } from "react";
import "./Create.css";
import { supabase } from "../../../../util/supabaseClient.js";
import { useNavigate } from "react-router-dom";
import ServiceTypeList from "../../../containers/ServiceTypeList.jsx";

const Create = () => {
  const [error, setError] = useState(null);
  const [serviceType, setServiceType] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const nb_membres = 0;
    const maxMembres = e.target.maxMembres.value;
    const description = e.target.description.value;
    const type = serviceType;

    const creatorId = localStorage.getItem("userId");

    const { data: auMoinsUnCreate } = await supabase
      .from("services")
      .select("*")
      .eq("creatorId", creatorId);

    const { data: estAbonne } = await supabase
      .from("users")
      .select("estAbonne")
      .eq("id", creatorId)
      .single();

    try {
      if (auMoinsUnCreate.length === 0 || estAbonne.estAbonne) {
        const { data, error } = await supabase.from("services").insert([
          {
            name,
            maxMembres,
            creatorId,
            type,
            description,
            nb_membres,
          },
        ]);
        if (error) {
          setError("Adding service failed. Please try again later.");
          return;
        }
        navigate("/");
      } else {
        setError("Tu dois être abonné pour créer plus qu'un service.");
      }
    } catch (error) {
      setError("Service failed. Please try again later.");
    }
  }
  return (
    <div className="form-container">
      <h1>Create Listing</h1>
      <form onSubmit={handleSubmit} className="addService-form">
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-field">
          <label htmlFor="maxMembres">Number of members allowed:</label>
          <input type="text" id="maxMembres" name="maxMembres" required />
        </div>
        <div className="form-field">
          <label htmlFor="type">Type of service:</label>
          <ServiceTypeList onSelect={(value) => setServiceType(value)} />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" required />
        </div>
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Create;
