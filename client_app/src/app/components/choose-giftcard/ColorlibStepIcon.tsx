import { StepIconProps, styled } from "@mui/material";
import DollarIcon from "./../../assets/icons/dollar-icon.svg";
import GiftIcon from "./../../assets/icons/gift-icon.svg";
import CheckIcon from "./../../assets/icons/check-icon.svg";

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;
  const icons: { [index: string]: React.ReactElement } = {
    1: <img src={GiftIcon} alt="" />,
    2: <img src={DollarIcon} alt="" />,
    3: <img src={CheckIcon} alt="" />,
  };

  const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1200,
    color: "#i",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundColor: "#cfd181",
    }),
    ...(ownerState.completed && {
      backgroundColor: "#cfd181",
    }),
  }));

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default ColorlibStepIcon;
