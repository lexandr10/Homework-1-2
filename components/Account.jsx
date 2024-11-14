import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import IconAvatar from "../icons/IconAvatar";
import { colors } from "../styles/global";
import LogoutIcon from "../icons/LogoutIcon";
import CardItem from "./CardItem";
import { useDispatch, useSelector } from "react-redux";
import { selectorPosts, selectorUser } from "../store/selectors/selectors";
import { useEffect, useState } from "react";
import { getInfoUserByUid } from "../firebase/firebase";

const Account = () => {
    const user = useSelector(selectorUser);
    const {postsItems, status, error} = useSelector(selectorPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        const getProfile = async () => {
            if (user && user.uid) { 
                await getInfoUserByUid(user.uid, dispatch);
            }
        };

        getProfile();
    }, []);

    return <View style={{flex: 1}}>
       
    <Image 
source={require("../assets/images/Photo BG.png")} 
resizeMode="cover" 
style={styles.image}/>
   <View style={styles.container}>
       <View style={styles.avatarContainer}>
       <Image source={require("../assets/images/Avatar.png")}/>
       <View style={styles.iconDelete}>
       <IconAvatar/>
       </View>
       </View>
       <View style={styles.IconLogout}>
           <LogoutIcon/>
       </View>
       <Text style={styles.title}>{user.displayName}</Text>
       <ScrollView style={{flex: 1}}>
       <View style={{marginTop: 32, gap: 32}}>
           {postsItems?.map(({name,id , location, userId,imageURL,  coordinates, likes, comments}) => <CardItem 
        id={id}
        name={name}
        location={location}
        userId={userId}
        imageURL={imageURL}
        coordinates={coordinates}
        likes={likes}
        comments={comments}/>)}
       </View>
       </ScrollView>
   </View>
</View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 147,
        backgroundColor: colors.white,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingHorizontal: 16
    },
    title: {
        fontSize: 30,
        fontWeight: "500",
        lineHeight: 35,
        textAlign: "center",
        marginTop: 92
    },
    IconLogout: {
position: "absolute",
right: 16,
top: 22
    },
    avatarContainer: {
        width: 137,
        position: "absolute",
        top: -60,
        alignSelf: "center"
    },
    iconDelete: {
position: "absolute",
bottom: 0,
right: 0
    },

    image: {
        position: "absolute",
        height: "100%",
        width: "100%",
        zIndex: -1,
        top: 0,
        bottom: 0
    },
})
 export default Account;