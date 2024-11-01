import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerResult } from 'expo-image-picker';

import { colors } from "../styles/global";
import IconPhoto from "../icons/IconPhoto";
import Input from "./Input";
import { useState, useCallback } from "react";
import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Button from "./Button";
import IconDelete from "../icons/IconDelete";
import { useFocusEffect, useNavigation } from "@react-navigation/native";


const FormCreatePost: React.FC = () => {

    const navigation = useNavigation();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [photo, setPhoto] = useState<null | string>(null);

useFocusEffect(useCallback(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } })
    return () => {
        navigation.getParent()?.setOptions({ tabBarStyle: {height: 83} })
    };
}, [navigation]))

const cleanForm = () => {
    setName("");
    setLocation("")
    setPhoto(null)
}

    const selectPhoto = async (): Promise<void> => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        const result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
    
        if (!result.canceled && result.assets) {
          setPhoto(result.assets[0].uri); 
        }
      };
    const handleNameChange = (value: string) => {
    setName(value)
    }
    const handleLocationChange = (value: string) => {
        setLocation(value)
        }
    const IconMap = (<Svg
        width={24}
        height={24}
        fill="none"
      >
        <Path
          stroke="#BDBDBD"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 10.364C20 16.09 12 21 12 21s-8-4.91-8-10.636C4 6.297 7.582 3 12 3s8 3.297 8 7.364v0Z"
          clipRule="evenodd"
        />
        <Path
          stroke="#BDBDBD"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
          clipRule="evenodd"
        />
      </Svg>);



    return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles. container}>
        <View style={styles.containerPhoto}>
        <TouchableOpacity onPress={selectPhoto} style={styles.btn}>
            {photo ? <Image  style={{width: "100%", height: "100%"}} source={{uri: photo}} /> : <IconPhoto/>}
        <Text style={styles.btnTitle}>Завантажте фото</Text>
       </TouchableOpacity>
        </View>
        <KeyboardAvoidingView style={styles.inputContainer}>
            <Input 
            colorText={colors.grayText} 
            outerStyles={styles.inputName} 
            value={name} 
            onTextChange={handleNameChange} 
            placeholder="Назва..."/>
            <Input 
            colorText={colors.grayText} 
            outerStyles={styles.inputLocation} 
            leftIcon={IconMap} 
            value={location} 
            onTextChange={handleLocationChange} 
            placeholder="Місцевість..."/>
        </KeyboardAvoidingView>
        <Button 
        buttonStyle={name && location && photo ? styles.btnActiveSubmit : styles.btnSubmit} onPress={() => {}}>
            <Text 
            style={ name && location && photo ? {color: "#FFFFFF"} : styles.textBtn }>Опубліковати</Text>
        </Button>
        <TouchableOpacity onPress={cleanForm} style={styles.iconDeleteContainer}>
        <IconDelete/>
        </TouchableOpacity>
        </View>
    </TouchableWithoutFeedback>
}

const styles = StyleSheet.create({
    containerPhoto: {
        height: 240,
        backgroundColor: colors.BGInput,
        borderColor: colors.borderInput,
        borderWidth: 1,
        marginTop: 32,
    },
    btnSubmit: {
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: colors.BGInput,
     marginTop: 32
    },
    btnActiveSubmit: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.orangeMain,
        marginTop: 32
    },
    textBtn: {
color: colors.grayText,
fontSize: 16,
lineHeight: 18,
fontWeight: "400"
    },
    container: {
        paddingHorizontal: 16,
        backgroundColor: colors.white,
        flex: 1,
        
    },
    btn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    btnTitle: {
        position: "absolute",
        bottom: -24,
        left: 0,
       color: colors.grayText
    },
    inputLocation: {
        backgroundColor: colors.white,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: colors.borderInput,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    inputName: {
        backgroundColor: colors.white,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: colors.borderInput,
    },
    inputContainer: {
        marginTop: 60,
        gap: 16
    },
    iconDeleteContainer: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 32,
       
    }
})

export default FormCreatePost;