import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";import IconMap from "../icons/IconMap";
import IconLike from "../icons/IconLike";
import IconMessage from "../icons/IconMessage";
import { colors } from "../styles/global";
import { useNavigation } from "@react-navigation/native";



const CardItem = () => {
const navigation = useNavigation();

return <View style={styles.cardContainer}>
<Image 
style={{width: "100%", borderRadius: 8}} 
source={require("../assets/images/Rectangle 23.png")}/>
<Text>Ліс</Text>
<View style={styles.reviewMap}>
<TouchableOpacity style={styles.iconTextBtn}>
    <IconMessage/>
    <Text style={styles.text}>4</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => navigation.navigate('Review')} style={styles.iconTextBtn}>
    <IconLike/>
    <Text style={styles.text}>4</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.iconTextBtn}>
    <IconMap/>
    <Text 
    style={[styles.text, {textDecorationLine: "underline"}]}>
        Ivano-Frankivs'k Region, Ukraine
        </Text>
</TouchableOpacity>
</View>

</View>
};

const styles = StyleSheet.create({
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
justifyContent: "space-between",
alignItems: "center"
    },
    text: {
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 18,
        color: colors.primary_black
    }
})

export default CardItem