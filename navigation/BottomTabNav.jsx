import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import {  View } from "react-native";

import ToolBarIcon from "../icons/ToolBarIcon";
import ProfileIcon from "../icons/ProfileIcon";
import StackCreatePosts from "./StackCreatePosts";
import IconPlusTabBar from "../icons/IconPlusTabBar";
import ProfileScreen from "../screens/ProfileScreen";
import MapScreen from "../screens/MapScreen";
import { colors } from "../styles/global";


const Tab = createBottomTabNavigator();


const BottomTabNav = () => {
    const navigation = useNavigation();
    return <Tab.Navigator initialRouteName="CreatePosts"
    screenOptions={{
        tabBarActiveBackgroundColor: colors.white, 
        tabBarShowLabel: false,
        tabBarStyle: {height: 83}
        }}>
        <Tab.Screen options={{tabBarIcon: ({focused}) => {
            const iconColor = focused ? colors.white : colors.blueLight ;
            const containerStyle = {
                backgroundColor: focused ? colors.orangeMain : "transparent",
                width: 70,
                height: 40,
                borderRadius: 20,
                justifyContent: "center", 
                alignItems: "center"
            }
            return (
                <View style={containerStyle}>
                  <ToolBarIcon color={iconColor} />
                </View>
              );
        }}}
         name="Posts" component={MapScreen}/>
        <Tab.Screen 
        options={{tabBarIcon: ({focused}) => {
            const iconColor = focused ? colors.white : colors.blueLight ;
            const containerStyle = {
                backgroundColor: focused ? colors.orangeMain : "transparent",
                width: 70,
                height: 40,
                borderRadius: 20,
                justifyContent: "center", 
                alignItems: "center"
            }
            return (
                <View style={containerStyle}>
                  <IconPlusTabBar color={iconColor} />
                </View>
              );
        },
        headerShown: false 
       }}
         name="CreatePosts" 
         component={StackCreatePosts}/>
        <Tab.Screen options={{headerShown: false,tabBarIcon: ({focused}) => {
            const iconColor = focused ? colors.white : colors.blueLight ;
            const containerStyle = {
                backgroundColor: focused ? colors.orangeMain : "transparent",
                width: 70,
                height: 40,
                borderRadius: 20,
                justifyContent: "center", 
                alignItems: "center"
            }
            return (
                <View style={containerStyle}>
                  <ProfileIcon color={iconColor} />
                </View>
              );
        }}}
         name="Profile" component={ProfileScreen}/>
    </Tab.Navigator>
}

export default BottomTabNav;
