import { Box, Button, Typography } from "@mui/material";
import "../styles/HomePage.css";
import ButtonComp from "./ButtonComp";
import LogoBlack from "../assets/LogoBlack.png";
import TransalateButton from "./TranslateButton";
import { getAuth, signOut } from "firebase/auth";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  userId: string | null; // Add userId prop
}

const HomePage = ({ setCurrentPage, userId }: Props) => {
  console.log("USERID : " + userId);

  // If userId is null, show a loading indicator or handle it in another way
  if (userId === null) {
    return <div>Loading...</div>; // You can replace this with your loading component or logic
  }

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      setCurrentPage("login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="page-div">
      <Typography
        variant="h2"
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          paddingTop: "4rem",
          fontFamily: "sans-serif",
        }}
      >
        <div className="header-container">
          <span className="saffron">Welcome</span>{" "}
          <span className="blue">To</span>{" "}
          <span className="white">Grievance</span>
          <span className="green">Helper</span>
        </div>
      </Typography>
      <Box sx={{ height: "10vh", width: "auto", paddingTop: "10vh" }}>
        <img className="logo" src={LogoBlack} alt="Logo"></img>
      </Box>
      <Box
        className="main-box"
        sx={{
          border: "3px solid #0000ff",
          borderRadius: "8px",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginTop: "20vh",
        }}
      >
        <Typography
          variant="h4"
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            fontFamily: "sans-serif",
            marginTop: "2rem",
          }}
        >
          What Would You Like To Do?
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "2rem",
            justifyContent: "center",
            gap: "20%",
            marginBottom: "0.4rem",
          }}
        >
          <ButtonComp
            buttonText={"Lodge A Complaint"}
            onClick={() => {
              setCurrentPage("complaint-page");
            }}
            buttonForeground={"#ff9933"}
            buttonBackground={"inherit"}
            buttonForegroundHover={"inherit"}
            buttonBackgroundHover={"#ff9933"}
            borderClr={"#ff9933"}
          ></ButtonComp>
          <ButtonComp
            buttonText={"Seek Help From AI Assistant"}
            onClick={() => {
              setCurrentPage("chat-page");
            }}
            buttonForeground={"green"}
            buttonBackground={"inherit"}
            buttonForegroundHover={"inherit"}
            buttonBackgroundHover={"green"}
            borderClr={"green"}
          ></ButtonComp>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "2rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            style={{
              borderRadius: "4px",
              marginLeft: "10px",
              backgroundColor: "#001489",
            }}
          >
            Log Out
          </Button>
        </Box>
      </Box>
      <Box sx={{ paddingTop: "4rem" }}>
        <TransalateButton />
      </Box>
    </div>
  );
};

export default HomePage;
