import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ProgressWave = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={254}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      stroke="#CECECE"
      strokeLinecap="round"
      strokeWidth={3}
      d="M2 10s2.675 3.278 5 4.5C15.153 18.785 17.79 2 27 2s10.79 12.5 20 12.5S57.79 2 67 2s10.79 12.5 20 12.5S97.79 2 107 2s10.79 12.5 20 12.5S137.79 2 147 2s10.79 12.5 20 12.5S177.79 2 187 2s10.79 12.5 20 12.5S217.79 2 227 2s11.847 16.785 20 12.5c2.325-1.222 5-4.5 5-4.5"
    />
  </Svg>
)
export default ProgressWave;
