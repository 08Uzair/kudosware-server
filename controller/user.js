import { supabase } from "../db/supabase.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = "uzer"; // Replace with a secure secret

// Get Users
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

// Sign Up
export const signup = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  try {
    // Validate input
    if (!userName || !userEmail || !userPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const { data: existingUsers, error: existingUserError } = await supabase
      .from("Auth")
      .select("*")
      .eq("userEmail", userEmail);

    if (existingUserError) {
      console.error("Error checking existing user:", existingUserError);
      return res.status(500).json({
        message: "Error checking existing user",
        error: existingUserError.message,
      });
    }

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userPassword, 12);

    // Insert the new user into the database
    const { data, error } = await supabase
      .from("Auth")
      .insert([{ userName, userEmail, userPassword: hashedPassword }]);

    if (error) {
      console.error("Error inserting user:", error);
      return res.status(500).json({
        message: "Error inserting user",
        error: error.message,
      });
    }

    // Return success response
    res.status(201).json({
      message: "User created successfully",
      user: data[0],
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Sign In
export const signin = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  try {
    // Validate input
    if (!userEmail || !userPassword) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if the user exists in the database
    const { data: user, error: fetchError } = await supabase
      .from("Auth")
      .select("*")
      .eq("userEmail", userEmail)
      .single(); // Ensure you are querying a single row

    if (fetchError) {
      console.error("Error fetching user:", fetchError);
      return res.status(500).json({ message: "Error fetching user", error: fetchError.message });
    }

    // Handle case where user is not found
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(userPassword, user.userPassword);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ email: user.userEmail, id: user.id }, secret, { expiresIn: "7d" });

    res.status(200).json({ result: user, token });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add User
export const addUser = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(userPassword, 12);

    const { data, error } = await supabase
      .from("Auth")
      .insert([
        {
          userName: userName,
          userEmail: userEmail,
          userPassword: hashedPassword,
        },
      ]);

    if (error) throw error;

    res.status(200).json({ message: "User added successfully", data });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
