import { createStackNavigator } from "@react-navigation/stack";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import FormCreatePost from "../components/FormCreatePost";
import LogoutIcon from "../icons/LogoutIcon";
import Review from "../components/Review";



type rootStackParams = {
    CreatePostsScreen: undefined,
    FormCreatePost: undefined
}
const Stack = createStackNavigator<rootStackParams>();

const StackCreatePosts = () => {
    return <Stack.Navigator initialRouteName="CreatePostsScreen">
    <Stack.Screen options={{ 
        headerTitle: "Публікації", 
        headerTitleAlign: "center", 
        headerRight: LogoutIcon, 
        headerRightContainerStyle: {padding: 16}}} 
    name="CreatePostsScreen" 
    component={CreatePostsScreen}/>
    <Stack.Screen 
    options={{headerTitle: "Створити публікацію", 
    headerTitleAlign: "center",
    }} 
        name="FormCreatePost" 
        component={FormCreatePost}/>
        <Stack.Screen name="Review" component={Review}/>
    </Stack.Navigator>
}

export default StackCreatePosts;