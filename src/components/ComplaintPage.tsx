import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import "../styles/ComplaintPage.css";
import { Typography } from "@mui/material";
import TransalateButton from "./TranslateButton";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  userId: string | null;
}

const ComplaintPage: React.FC<Props> = ({ setCurrentPage, userId }) => {
  const ministriesList = [
    "Ministry of Home Affairs",
    "Ministry of Finance",
    "Ministry of Health and Family Welfare",
    "Ministry of External Affairs",
    "Ministry of Defence",
    "Ministry of Education",
    "Ministry of Women and Child Development",
    "Ministry of Agriculture and Farmers Welfare",
    "Ministry of Rural Development",
    "Ministry of Housing and Urban Affairs",
    "Ministry of Information and Broadcasting",
    "Ministry of Science and Technology",
    "Ministry of Environment, Forest and Climate Change",
    "Ministry of Social Justice and Empowerment",
    "Ministry of Law and Justice",
    "Ministry of Petroleum and Natural Gas",
    "Ministry of Commerce and Industry",
    "Ministry of Railways",
    "Ministry of Road Transport and Highways",
    "Ministry of Civil Aviation",
    "Ministry of Power",
    "Ministry of Jal Shakti",
    "Ministry of Mines",
    "Ministry of Steel",
    "Ministry of Tourism",
    "Ministry of Electronics and Information Technology",
    "Ministry of Textiles",
    "Ministry of Labour and Employment",
    "Ministry of Tribal Affairs",
    "Ministry of Food Processing Industries",
  ];

  const [selectedMinistry, setSelectedMinistry] = useState<string>("");
  const [complaintText, setComplaintText] = useState<string>("");
  const [complaintSubmitted, setComplaintSubmitted] = useState<boolean>(false);

  const handleMinistryChange = (event: SelectChangeEvent<string>) => {
    setSelectedMinistry(event.target.value);
  };

  const handleComplaintSubmit = () => {
    console.log("UserID:", userId);
    console.log("Ministry:", selectedMinistry);
    console.log("Complaint:", complaintText);

    // Handle complaint submission logic

    // Show the complaint submitted overlay
    setComplaintSubmitted(true);

    // Optionally, you can reset the form fields
    setSelectedMinistry("");
    setComplaintText("");
  };

  const handleOK = () => {
    setComplaintSubmitted(false);
    setSelectedMinistry("");
    setComplaintText("");
  };

  return (
    <div className="root-page" style={{ color: "white" }}>
      <div>
        <Typography
          variant="h2"
          sx={{ marginBottom: "4rem", fontFamily: "sans-serif" }}
        >
          <span style={{ color: "#001489", marginRight: "1rem" }}>Lodge</span>
          <span style={{ color: "#001489", marginRight: "1rem" }}>A</span>
          <span style={{ color: "#001489" }}>Complaint</span>
        </Typography>
      </div>
      <div className="complaint-container">
        <FormControl fullWidth>
          <InputLabel id="ministry-label">Select Ministry</InputLabel>
          <Select
            labelId="ministry-label"
            id="ministry"
            value={selectedMinistry}
            label="Select Ministry"
            onChange={handleMinistryChange}
          >
            {ministriesList.map((ministry) => (
              <MenuItem key={ministry} value={ministry}>
                {ministry}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id="complaint-text"
          label="Write your complaint"
          multiline
          rows={14}
          fullWidth
          variant="outlined"
          value={complaintText}
          onChange={(e) => setComplaintText(e.target.value)}
          className="complaint-text"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleComplaintSubmit}
          sx={{ backgroundColor: "#001489" }}
        >
          Submit Complaint
        </Button>
      </div>
      <Button
        onClick={() => {
          setCurrentPage("home");
        }}
        variant="contained"
        color="primary"
        style={{
          borderRadius: "4px",
          marginLeft: "10px",
          marginTop: "2rem",
          marginBottom: "2rem",
          backgroundColor: "#001489",
        }}
      >
        Back To Home
      </Button>

      {complaintSubmitted && (
        <div className="complaint-overlay">
          <Typography variant="h4" style={{ color: "white" }}>
            Complaint Submitted!
          </Typography>
          <Button
            color="primary"
            onClick={handleOK}
            type="submit"
            sx={{
              color: "white",
              backgroundColor: "#001489",
              borderColor: "inherit",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              marginTop: "2rem",
              fontSize: "clamp(8px, 1.5   , 20px)",
              "&:hover": {
                backgroundColor: "#001489",
                color: "white",
                borderColor: "inherit",
              },
            }}
          >
            Ok
          </Button>
        </div>
      )}

      <TransalateButton />
    </div>
  );
};

export default ComplaintPage;
