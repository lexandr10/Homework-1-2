import Svg, { Path } from "react-native-svg"
import { colors } from '../styles/global';
import * as React from "react"

const IconPlusTabBar = ({color}) => (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
  >
    <Path
      fill={color}
      fillOpacity={0.8}
      fillRule="evenodd"
      d="M20.5 13.5h-1v6h-6v1h6v6h1v-6h6v-1h-6v-6Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default IconPlusTabBar;
