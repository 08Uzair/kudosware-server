import { supabase } from "../db/supabase.js";

export const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase.from("Auth").select("*");

    if (error) {
      throw error;
    }

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Corrected addUser function
export const addUser = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  try {
    const { data, error } = await supabase
      .from("Auth")
      .insert([{ userName, userEmail, userPassword }]);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: "User added successfully", data });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
