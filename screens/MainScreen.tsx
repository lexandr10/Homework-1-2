import { useSelector } from "react-redux"
import BottomTabNav from "../navigation/BottomTabNav"
import StackLoginNav from "../navigation/StackLoginNav"
import { selectorUser } from "../store/selectors/selectors"

const MainScreen = () => {
const user = useSelector(selectorUser)

    return <>
    {user ? <BottomTabNav/> :  <StackLoginNav/>}
    </>
}

export default MainScreen;