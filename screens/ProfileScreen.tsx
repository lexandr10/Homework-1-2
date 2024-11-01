import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import Review from "../components/Review";
import Account from "../components/Account";


type rootStackParams = {
    ProfileScreen: undefined,
    Review: undefined
}
const Stack = createStackNavigator<rootStackParams>();

const ProfileScreen = () => {
    return <Stack.Navigator>
        <Stack.Screen name="Account" component={Account}/>
        <Stack.Screen options={{headerTitleAlign: "center", headerTitle: "Коментарі"}} name="Review" component={Review}/>
    </Stack.Navigator>
}


export default ProfileScreen;