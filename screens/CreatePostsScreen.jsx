import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../styles/global";
import { useNavigation, useRoute } from "@react-navigation/native";
import CardItem from "../components/CardItem";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectorPosts, selectorUser } from "../store/selectors/selectors";
import postThunk from "../store/thunk/postThunk";



const CreatePostsScreen = () => {
const navigation = useNavigation();
const {postsItems, status, error} = useSelector(selectorPosts);
const user = useSelector(selectorUser);
const dispatch = useDispatch();

useEffect(() => {
    dispatch(postThunk(user.uid));
}, [dispatch, user.uid, postsItems.length])

if (status === 'loading') {
    return <View><Text>
        Loading...</Text>
        </View>;
  }

    return <View style={styles.container}>
       <View style={styles.userContainer}>
            <Image source={require("../assets/images/User.png")}/>
            <View>
                <Text>Natali Romanova</Text>
                <Text>{user.email}</Text>
            </View>
        </View>
        <ScrollView style={{flex: 1}}>
        <View style={styles.cardsBox}>
        { postsItems.length === 0 ? <View><Text>
            You have no existing posts.</Text>
        </View> : postsItems?.map(({name,id , location, userId,imageURL,  coordinates, likes, comments}) => 
        <CardItem 
        id={id}
        name={name}
        location={location}
        userId={userId}
        imageURL={imageURL}
        coordinates={coordinates}
        likes={likes}
        comments={comments}/>) }
        </View>
        </ScrollView>
        <TouchableOpacity 
        onPress={() => navigation.navigate('FormCreatePost')} 
        style={styles.buttonCreatePost}>
            <Text style={{color: colors.white}}>Create post</Text>
        </TouchableOpacity>
    </View>
}

export default CreatePostsScreen;

const styles = StyleSheet.create({
    cardsBox: {
gap: 32,
marginTop: 32
    },
    cardContainer: {
gap: 8
    },
    iconTextBtn: {
        flexDirection: "row", 
        gap: 4,
        alignItems: "center"
    },
    reviewMap: {
flexDirection: "row",
justifyContent: "space-between"
    },
userContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center"
},
container: {
    flex: 1, 
    marginTop: 32,
    paddingHorizontal: 16
},
buttonCreatePost: {
    position: "absolute",
    bottom: 16,
    right: 16,
    padding: 8,
    backgroundColor: colors.orangeMain,
    borderRadius: 10
}
})