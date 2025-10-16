import { useState, useEffect } from "react";
import { supabase } from "../../../../util/supabaseClient.js";

const Edit = () => {
  return (
    <div>
      <h1>Edit Job Listing</h1>
      <p>Select a listing to update or modify its details.</p>
    </div>
  );
};

export default Edit;
