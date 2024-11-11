
import { Dimensions, Image, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { colors } from "../styles/global";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { launchImageLibrary } from 'react-native-image-picker';


import Input from "../components/Input";
import Button from "../components/Button"

import IconPlus from "../icons/IconPlus";
import { useNavigation } from "@react-navigation/native";
import { RegistrationScreenNavigationProp } from "../navigation/StackLoginNav";
import { registerDB } from "../firebase/auth";

const {width: SCREEN_WIDTH} = Dimensions.get("screen");



const RegistrationScreen = () => {

    const navigation = useNavigation<RegistrationScreenNavigationProp>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    const [showPass, setShowPass] = useState(false);

    const handleEmailChange = (value: string) => {
    setEmail(value)
    }
    const [loadImage, setLoadImage] = useState("");
    const selectImage = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: false,
    }


    launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.assets) {
          const uri = response.assets[0].uri;
          setLoadImage(uri);
        }
      });
    }

    const handleLoginChange = (value: string) =>{
        setLogin(value)
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
    }

    const handleShowPass = () => {
        setShowPass(prev => !prev);
    }

    const submit = () => {
        registerDB({email, password, login})
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
    resizeMode="cover" style={styles.image}/>
    <View style={styles.formContainer}>
    
    <View style={styles.addPhotoContainer}>
    <TouchableOpacity onPress={selectImage} style={styles.photoBox}>
    {loadImage && <Image source={{uri: loadImage}} resizeMode="cover" />}
        <IconPlus/>
        </TouchableOpacity>
        
       
    </View>
<Text style={styles.mainTitle}>Реєстрація</Text>
<KeyboardAvoidingView style={styles.inputContainer} 
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <Input 
    value={login}
    placeholder="Логін"
    onTextChange={handleLoginChange}
    />
    <Input
     value={email}
     placeholder="Адреса електронної пошти"
     onTextChange={handleEmailChange}/>
    <Input
    value={password}
    rightButton={showButton} 
    placeholder="Пароль"
    outerStyles={styles.passwordInput}
    onTextChange={handlePasswordChange}
    secureTextEntry={showPass}/>
  </KeyboardAvoidingView>
  <View style={[styles.inputContainer, styles.buttonContainer]}>
        <Button onPress={submit}>
            <Text style={styles.textButton}>Зареєстуватися</Text>
            </Button>
            <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
            Вже є акаунт?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.signUpText, {textDecorationLine: "underline"}]}>Увійти</Text>
            </TouchableOpacity>
            </View> 

    </View>
    </View>
    </View>
    </TouchableWithoutFeedback>
    
}

export default RegistrationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    photoBox: {
        width: 120,
        height: 120,
        borderRadius: 16,
        backgroundColor: colors.borderInput,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    addPhotoContainer: {
     width: "100%",
     justifyContent: "center",
     alignItems: 'center',
     position: "absolute",
     top: -60

    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 4
        },
        signUpText: {
            color: colors.blueLight,
            fontWeight: "400",
            fontSize: 16,
            lineHeight: 18
            },
    textButton: {
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 18,
        textAlign: "center",
        color: colors.white
        },
    buttonContainer: {
        marginTop: 42
    },
    image: {
        position: "absolute",
        height: "100%",
        width: "100%",
        zIndex: -1,
        top: 0,
        bottom: 0
    },
    formContainer: { 
width: SCREEN_WIDTH,
height: "65%",
backgroundColor: colors.white,
borderTopLeftRadius: 25,
borderTopRightRadius: 25,
position: "absolute",
bottom: 0,
paddingLeft: 16,
paddingRight: 16,
paddingTop: 92,
    },
    mainTitle: {
        fontWeight: "500",
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center"
    },
    inputContainer: {
        gap: 16,
        marginTop: 32
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

})