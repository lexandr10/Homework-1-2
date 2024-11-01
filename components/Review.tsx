import { Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { colors } from "../styles/global";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Input from "./Input";
import IconReviewBtn from "../icons/IconReviewBtn";

const Review = () => {
const navigation = useNavigation();
const [review, setReview] = useState("");

const handleReviewChange = (value: string) => {
setReview(value);
}

useFocusEffect(useCallback(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } })
    return () => {
        navigation.getParent()?.setOptions({ tabBarStyle: {height: 83} })
    };
}, [navigation]))

const btnReview = <TouchableOpacity>
    <IconReviewBtn/>
</TouchableOpacity>

 return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
     <View style={styles.container}>
    <Image style={styles.image} source={require("../assets/images/Content Block.png")} />
    <View style={{gap: 24, marginTop: 32}}>
        <View style={styles.containerMessage}>
            <Image source={require("../assets/images/Ellipse.png")}/>
            <View style={styles.message}>
                <Text>
                Really love your most recent photo. 
                I’ve been trying to capture 
                the same thing for 
                a few months and would love some tips!
                    </Text>
                    <Text>09 червня, 2020 | 08:40</Text>
                    </View>
        </View>
        <View style={styles.containerMessage}>
            <View style={styles.message}>
                <Text>
                A fast 50mm like f1.8 would help with the bokeh. 
                I’ve been using primes as they tend to get a bit sharper images.
                    </Text>
                    <Text>09 червня, 2020 | 08:40</Text>
                    </View>
                    <Image source={require("../assets/images/AvatarGirl.png")}/>
        </View>
        <View style={styles.containerMessage}>
            <Image source={require("../assets/images/Ellipse.png")}/>
            <View style={styles.message}>
                <Text>
                Thank you! That was very helpful!
                    </Text>
                    <Text>09 червня, 2020 | 08:40</Text>
                    </View>
        </View>
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