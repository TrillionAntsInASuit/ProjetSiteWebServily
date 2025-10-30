import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://jqzikfdhreitzpzfofsj.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxemlrZmRocmVpdHpwemZvZnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMjYyMTYsImV4cCI6MjA3MzgwMjIxNn0.xsIfQjgrTEGzMYDGt9VpXr8ADToJhpGOhfsNuOtxP1s";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
