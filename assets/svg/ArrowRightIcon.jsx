import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowRightIcon(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 9a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9z"
        fill="#414040"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.47 3.22a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 01-1.06-1.06L13.19 9 8.47 4.28a.75.75 0 010-1.06z"
        fill="#414040"
      />
    </Svg>
  )
}

export default ArrowRightIcon
