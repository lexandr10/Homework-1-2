import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";


type rootStackParams = {
    Login: undefined,
    Registration: undefined
}
const Stack = createStackNavigator<rootStackParams>();

export type LoginScreenNavigationProp = StackNavigationProp<rootStackParams, "Login">;
export type RegistrationScreenNavigationProp = StackNavigationProp<rootStackParams, "Registration">;

const StackLoginNav = () => {
    return <Stack.Navigator initialRouteName="Login">
    <Stack.Screen 
    options={{headerShown: false, presentation: "modal"}} 
    name="Login" 
    component={LoginScreen}/>
    <Stack.Screen 
    options={{headerShown: false, presentation: "modal"}} 
    name="Registration" 
    component={RegistrationScreen}/>
    </Stack.Navigator>

}

export default StackLoginNav;