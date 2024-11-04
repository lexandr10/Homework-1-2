import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../styles/global";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import CardItem from "../components/CardItem";
import { useEffect } from "react";
import { coordsObj } from "../components/FormCreatePost";

type CreatePostsScreenRouteProp = RouteProp<
  { CreatePostsScreen: { 
    name: string; 
    photo: string | null; 
    locationPhoto: coordsObj | null; 
    location: string } },
  'CreatePostsScreen'
>;

const CreatePostsScreen = () => {
const navigation = useNavigation();
const route = useRoute<CreatePostsScreenRouteProp>();
const {name, photo, location, locationPhoto} = route.params || {};


useEffect(() => {
    console.log("Route parameters:", route.params);
}, [route.params])

    return <View style={styles.container}>
       <View style={styles.userContainer}>
            <Image source={require("../assets/images/User.png")}/>
            <View>
                <Text>Natali Romanova</Text>
                <Text>email@example.com</Text>
            </View>
        </View>
        <ScrollView style={{flex: 1}}>
        <View style={styles.cardsBox}>
        {name && photo && location && locationPhoto ? (
  <CardItem 
    name={name} 
    photo={photo} 
    location={location} 
    locationPhoto={locationPhoto} 
  />
) : (
  <Text>No data available</Text>
)}
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