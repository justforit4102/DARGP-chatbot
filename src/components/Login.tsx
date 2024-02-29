import React, { ChangeEvent, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "../styles/MiscStyles.css";
import "../styles/index.css";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}

const Login = ({ setCurrentPage, setUserId }: Props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setCurrentPage("home");
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, [setUserId, setCurrentPage]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);

      const auth = getAuth();
      const { email, password } = formData;

      // Use signInWithEmailAndPassword to authenticate the user
      await signInWithEmailAndPassword(auth, email, password);

      // The onAuthStateChanged listener will handle navigation to the home page
    } catch (error) {
      console.error("Error during login:", error);
      alert("Incorrect username or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleNoAccount = () => {
    setCurrentPage("register");
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
              backgroundColor: "rgba(255,255,255,0.4)",
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
              Log in
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
                label="Password"
                variant="outlined"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <button className="submit" type="submit" onClick={handleSubmit}>
                  Login
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
              <Box>
                <Typography
                  variant="h6"
                  style={{
                    color: "#03045E ",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "1.0em",
                  }}
                  onClick={handleNoAccount}
                >
                  No Account? Click To Register
                </Typography>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
