import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import CardItem from "../components/CardItem";


const CreatePostsScreen = () => {
const navigation = useNavigation()

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
           <CardItem/>
           <CardItem/>
           <CardItem/>
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