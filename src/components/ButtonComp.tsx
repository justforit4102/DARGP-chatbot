import Button from "@mui/material/Button";

interface ButtonCompProps {
  onClick: () => void;
  buttonText: string;
  buttonForeground: string;
  buttonBackground: string;
  buttonForegroundHover: string;
  buttonBackgroundHover: string;
  borderClr: string;
  buttonWidth?: string; // Optional prop for custom width
}

const ButtonComp: React.FC<ButtonCompProps> = ({
  onClick,
  buttonText,
  buttonBackground,
  buttonForeground,
  buttonBackgroundHover,
  buttonForegroundHover,
  borderClr,
  buttonWidth = "30vw", // Default width
}) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      size="large"
      sx={{
        color: buttonForeground,
        background: buttonBackground,
        borderColor: borderClr,
        width: buttonWidth,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        fontSize: "clamp(8px, 1.5   , 20px)",
        "&:hover": {
          backgroundColor: buttonBackgroundHover,
          color: buttonForegroundHover,
          borderColor: "inherit",
        },
      }}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

export default ButtonComp;
