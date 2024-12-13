import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ArrowLeftIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#CECECE"
      fillRule="evenodd"
      d="M4.5 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2h-14a1 1 0 0 1-1-1Z"
      clipRule="evenodd"
    />
    <Path
      fill="#CECECE"
      fillRule="evenodd"
      d="M13.207 4.293a1 1 0 0 1 0 1.414L6.914 12l6.293 6.293a1 1 0 0 1-1.414 1.414l-7-7a1 1 0 0 1 0-1.414l7-7a1 1 0 0 1 1.414 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default ArrowLeftIcon;
