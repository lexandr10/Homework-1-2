import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { colors } from "../styles/global";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import Input from "./Input";
import IconReviewBtn from "../icons/IconReviewBtn";
import { useDispatch, useSelector } from "react-redux";
import { selectorPosts, selectorUser } from "../store/selectors/selectors";
import { addComment } from "../firebase/firebase";
import postThunk from "../store/thunk/postThunk";

const Review = () => {
const navigation = useNavigation();
const [review, setReview] = useState("");
const route = useRoute();
const user = useSelector(selectorUser);
const {postsItems} = useSelector(selectorPosts);
const ditpatch = useDispatch();

const post = postsItems.find((item) => item.id === route.params.id);
const comments = post ? post.comments : [];

const handleReviewChange = (value) => {
setReview(value);
}

const submitReview = async() => {
 await addComment(route.params.id, {text: review, userId: user.uid});
 await ditpatch(postThunk(user.uid));
 setReview("");
}

useFocusEffect(useCallback(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } })
    return () => {
        navigation.getParent()?.setOptions({ tabBarStyle: {height: 83} })
    };
}, [navigation]))

const btnReview = <TouchableOpacity onPress={submitReview}>
    <IconReviewBtn/>
</TouchableOpacity>

 return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
     <View style={styles.container}>
    <Image style={styles.image} source={{uri: route.params.imageURL}} />
    <View style={{gap: 24, marginTop: 32}}>
        {comments.length === 0 ? <Text>No comments yet</Text> : comments.map(({text}) =><View style={styles.containerMessage}>
            <Image source={require("../assets/images/Ellipse.png")}/>
            <View style={styles.message}>
                <Text>
                {text}
                    </Text>
                    <Text>Date</Text>
                    </View>
        </View>)}
    </View>
    <KeyboardAvoidingView 
    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    behavior="padding" 
    style={{
        position: "absolute",
        bottom: 16,
        alignSelf: "center"}}>
    <Input 
    rightButton={btnReview} 
    value={review} 
    onTextChange={handleReviewChange}
    placeholder="Коментувати..." 
    outerStyles={styles.btnContainer} />
    </KeyboardAvoidingView>
 </View>   
 </TouchableWithoutFeedback>

}

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        alignSelf: "center",
        borderRadius: 100
    },

    image: {
        width: "100%",
        height: 240,
        borderRadius: 8,
        marginTop: 32
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: colors.white
    },
    containerMessage: {
        flexDirection: "row",
        marginRight: 16
    },
    message: {
        padding: 16,
        marginBottom: 8,
        backgroundColor: colors.BGInput,
      alignItems: "flex-end"
       
    }
})

export default Review;