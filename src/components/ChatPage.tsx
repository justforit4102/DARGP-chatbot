import { Button } from "@mui/material";
import "../styles/ChatPage.css";
import "../styles/Chatbot.css";
import Chatbot from "./Chatbot";
import TransalateButton from "./TranslateButton";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}

const ChatPage = ({ setCurrentPage }: Props) => {
  return (
    <div className="main-div">
      <div style={{ marginTop: "6rem" }}>
        <Chatbot></Chatbot>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Button
          onClick={() => {
            setCurrentPage("home");
          }}
          variant="contained"
          color="primary"
          style={{
            borderRadius: "4px",
            marginLeft: "10px",
            backgroundColor: "#001489",
          }}
        >
          Back To Home
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
          marginLeft: "30px",
        }}
      >
        <TransalateButton />
      </div>
    </div>
  );
};

export default ChatPage;
