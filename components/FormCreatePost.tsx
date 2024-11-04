import { Image, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

import { colors } from "../styles/global";
import IconPhoto from "../icons/IconPhoto";
import Input from "./Input";
import { useState, useCallback } from "react";
import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Button from "./Button";
import IconDelete from "../icons/IconDelete";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FormCreatePostNavigationProp } from "../navigation/StackCreatePosts";

export type coordsObj = {
    latitude: number,
    longitude: number
}

const FormCreatePost: React.FC = () => {

    const navigation = useNavigation<FormCreatePostNavigationProp>();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [photo, setPhoto] = useState<null | string>(null);

    const [locationPhoto, setLocationPhoto] = useState<coordsObj | null>(null);

    React.useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          const coords = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          }
          setLocationPhoto(coords)
        } )();
      }, []);

const handleCreatePost = () => {
    const data = {
        name, 
        photo, 
        locationPhoto, 
        location
    }
    navigation.navigate('CreatePostsScreen', data);
        }

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
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
        
        
    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
        alert("Необходимо разрешить доступ к камере и библиотеке для сохранения фото.");
        return;
    }
    
        const result: ImagePicker.ImagePickerResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
    
        if (!result.cancelled && result.assets && result.assets.length > 0) {
            const imageUri = result.assets[0].uri; 
            setPhoto(imageUri); 
    
            try {
                await MediaLibrary.saveToLibraryAsync(result.assets[0].uri); 
                alert("Фото успешно сохранено!");
            } catch (error) {
                console.error("Ошибка при сохранении фото:", error);
                alert("Ошибка при сохранении фото в библиотеку.");
            }
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
            {photo ? <Image  
            style={{width: "100%", height: "100%"}} 
            source={{uri: photo}} /> : <IconPhoto/>}
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
        buttonStyle={
            name && location && photo ? styles.btnActiveSubmit : styles.btnSubmit} 
        onPress={handleCreatePost}>
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
