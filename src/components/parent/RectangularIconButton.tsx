import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { PARENTHEADERLIST } from "../../common/constants";
import "./RectangularIconButton.css";
import { SyntheticEvent, useState } from "react";
const RectangularIconButton: React.FC<{
  buttonWidth: number;
  buttonHeight: number;
  iconSrc: string;
  // rectangularIcon: any;
  name: string;
  isButtonEnable: boolean;
  onHeaderIconClick: React.MouseEventHandler<HTMLDivElement>;
}> = ({
  buttonWidth,
  buttonHeight,
  iconSrc,
  // rectangularIcon,
  name,
  isButtonEnable,
  onHeaderIconClick,
}) => {

  // const isButtonEnable;
  const [tabIndex, setTabIndex] = useState(name);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    // setValue(newValue);
    setTabIndex(newValue);

    
  }
  return (
    <div
      id="rectangular-icon-button"
      onClick={onHeaderIconClick}
      style={{
        width: buttonWidth + "vw",
        height: buttonHeight + "vh",
        opacity: isButtonEnable ? "1" : "0.5",
      }}
    >
       { <img
        id="rectangular-icon-button-img"
        style={{
          width: "auto",
          height: buttonHeight - 2 + "vh",
        }}
        alt={iconSrc}
        src={iconSrc}
      /> } 
      <p>{name}</p>
      {/* { {rectangularIcon} } */}
    </div>
  );
};
export default RectangularIconButton;
