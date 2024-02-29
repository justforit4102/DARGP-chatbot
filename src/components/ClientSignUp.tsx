import React, { ChangeEvent, FormEvent, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp, getApps, FirebaseApp, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "../styles/MiscStyles.css";
import "../styles/index.css";

// Replace with your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrK5dGY-ISWzr6BNN2LhmeLHjzVUofKpQ",
  authDomain: "grievancehelper.firebaseapp.com",
  projectId: "grievancehelper",
  storageBucket: "grievancehelper.appspot.com",
  messagingSenderId: "731758671976",
  appId: "1:731758671976:web:8e2d68beed50fd1ea223dd",
  measurementId: "G-JLJCQB3SBX",
};

// Initialize Firebase
const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const ClientSignUp = ({ setCurrentPage }: Props) => {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
    location: "",
    specialization: "",
    aadharNumber: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Perform data validation checks
    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!validateAadharNumber(formData.aadharNumber)) {
      alert("Please enter a valid Aadhar number.");
      return;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (!validatePassword(formData.password)) {
      alert(
        "Password must contain at least 8 characters, one uppercase letter, and one special character."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // If all checks pass, submit the data to Firebase
    try {
      setLoading(true); // Set loading to true when starting registration

      const auth = getAuth(app);
      const registrationResult = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const db = getFirestore(app);
      const usersCollection = collection(db, "users");

      // Check if Aadhar number already exists in Firestore
      const aadharQuery = query(
        usersCollection,
        where("aadharNumber", "==", formData.aadharNumber)
      );
      const aadharQuerySnapshot = await getDocs(aadharQuery);

      if (!aadharQuerySnapshot.empty) {
        // If Aadhar number already exists, delete the newly created user
        await registrationResult.user.delete();
        alert("User with the same Aadhar number already exists.");
        return;
      }

      // If Aadhar number is unique, add user data to Firestore
      const userData = { ...formData, uid: registrationResult.user.uid };
      await addDoc(usersCollection, userData);

      console.log("User registered successfully:", userData);

      // Reset form after successful submission
      setFormData({
        email: "",
        phoneNumber: "",
        username: "",
        password: "",
        confirmPassword: "",
        location: "",
        specialization: "",
        aadharNumber: "",
      });

      // Redirect or update UI as needed
      setCurrentPage("login");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle registration error
    } finally {
      setLoading(false); // Set loading to false regardless of the result
    }
  };

  const validateEmail = (email: string): boolean => {
    // Add email validation logic here (e.g., using regular expressions)
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    // Add phone number validation logic here
    return /^[0-9]{10}$/.test(phoneNumber);
  };

  const validateAadharNumber = (aadharNumber: string): boolean => {
    // Add Aadhar number validation logic here
    return /^[0-9]{12}$/.test(aadharNumber);
  };

  const validatePassword = (password: string): boolean => {
    // Add password validation logic here (at least 8 characters, one uppercase letter, one special character)
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/.test(password);
  };

  const handleExistingAccount = () => {
    setCurrentPage("login");
  };

  return (
    <Box
      className="container"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: 0,
        padding: 0,
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={4}>
          <Box
            sx={{
              border: "3px solid #0000ff",
              borderRadius: "8px",
              backgroundColor: "rgba(255,255,255,0.8)",
              padding: "20px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                m: 3,
                color: "#03045E",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Sign up as a client
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                variant="outlined"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Aadhar Number"
                variant="outlined"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <button
                  className="submit"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading} // Disable the button during loading
                >
                  Submit
                </button>
              </Box>

              {loading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: 2,
                  }}
                >
                  <CircularProgress color="primary" />
                </Box>
              )}

              <Typography
                variant="h6"
                style={{
                  color: "#03045E ", // Default color when not hovered
                  textDecoration: "underline", // Add underline to mimic a link
                  cursor: "pointer", // Change cursor to pointer to indicate interactivity
                  fontSize: "1.0em",
                }}
                onClick={handleExistingAccount}
              >
                Already Have an Account? Click To Login
              </Typography>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientSignUp;
