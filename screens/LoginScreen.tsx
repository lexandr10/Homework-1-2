import { Dimensions,
     Image, Keyboard,
      KeyboardAvoidingView, 
      Platform, 
      StyleSheet, 
      Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import React, {  useState } from "react";
import { colors } from "../styles/global";

import { LoginScreenNavigationProp} from "../App";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";


const {width: SCREEN_WIDTH} = Dimensions.get("screen");


const LoginScreen = () => {

const navigation = useNavigation<LoginScreenNavigationProp>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const handleEmailChange = (value: string) => {
    setEmail(value)
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
    }

    const handleShowPass = () => {
        setShowPass(prev => !prev);
    }

    const login = () => {
        console.log({email, password})
    }


    const showButton = (
    <TouchableOpacity onPress={handleShowPass}>
        <Text style={styles.showButton}>Показати</Text>
    </TouchableOpacity>
);
        

return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.container}>
    <Image 
    source={require("../assets/images/Photo BG.png")} 
    resizeMode="cover" 
    style={styles.image}/>

    <View style={styles.formContaner}>
    <Text style={styles.mainTitle}>Увійти</Text>
    <KeyboardAvoidingView 
    behavior="padding"
    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
  >
         <View
    style={[styles.inputContainer, 
    styles.inputMarginContainer]}>
        <Input 
        value={email}
        placeholder="Адреса електронної пошти"
        onTextChange={handleEmailChange}
        />
        <Input 
        value={password}
        rightButton={showButton} 
        placeholder="Пароль"
        outerStyles={styles.passwordInput}
        onTextChange={handlePasswordChange}
        secureTextEntry={showPass}
        />
    </View>
    </KeyboardAvoidingView>
   
    <View style={[styles.inputContainer, styles.buttonContainer]}>
        <Button onPress={login}>
            <Text style={styles.textButton}>Увійти</Text>
            </Button>
            <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
            Немає акаунту?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
            <Text style={[styles.signUpText, {textDecorationLine: "underline"}]}>Зареєструватися</Text>
            </TouchableOpacity>
            </View> 

    </View>

    </View>
</View>
</TouchableWithoutFeedback>

}

export default LoginScreen;

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
},
textButton: {
fontSize: 16,
fontWeight: "400",
lineHeight: 18,
textAlign: "center",
color: colors.white
},
signUpText: {
color: colors.blueLight,
fontWeight: "400",
fontSize: 16,
lineHeight: 18
},
showButton: {
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    color: colors.blueLight
},
passwordInput: {
    flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
},
inputContainer: {
gap: 16
},
buttonContainer: {
    marginTop: 42
},
inputMarginContainer: {
marginTop: 32
},
image: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: -1,
    top: 0,
    bottom: 0
},
formContaner: {
width: SCREEN_WIDTH,
height: "50%",
backgroundColor: colors.white,
borderTopLeftRadius: 25,
borderTopRightRadius: 25,
position: "absolute",
bottom: 0,
paddingLeft: 16,
paddingRight: 16,
paddingTop: 32
},
mainTitle: {
    fontSize: 30,
    color: colors.primary_black,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 36,

},
signUpContainer: {
flexDirection: "row",
justifyContent: "center",
alignItems: "center",
gap: 4
}
})