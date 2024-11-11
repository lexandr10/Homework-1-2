import * as React from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import Svg, { Path } from "react-native-svg"
import { useDispatch } from "react-redux"
import { logoutDB } from "../firebase/auth"
const LogoutIcon = () => {
  const distpach = useDispatch();

  handleLogout = () => {
    logoutDB(distpach);
  }
  return <TouchableOpacity onPress={handleLogout}>
  <Svg
xmlns="http://www.w3.org/2000/svg"
width={24}
height={24}
fill="none"
>
<Path
  stroke="#BDBDBD"
  strokeLinecap="round"
  strokeLinejoin="round"
  d="M10 22H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h5M17 16l4-4-4-4M21 12H9"
/>
</Svg>
</TouchableOpacity>
}
  

export default LogoutIcon;
