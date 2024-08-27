import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://oixgoapfgiqxlwsadjnm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9peGdvYXBmZ2lxeGx3c2Fkam5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2ODI0NDUsImV4cCI6MjA0MDI1ODQ0NX0.89fXxjgxpz0I99wy9u07K1gFwVpwfKRlyZuKX8RuPWs";

export const supabase = createClient(supabaseUrl, supabaseKey);
