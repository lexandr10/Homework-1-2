import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";import IconMap from "../icons/IconMap";
import IconLike from "../icons/IconLike";
import IconMessage from "../icons/IconMessage";
import { colors } from "../styles/global";
import { useNavigation } from "@react-navigation/native";




const CardItem = ({name, location, userId, imageURL,id,  coordinates, likes, comments}) => {
const navigation = useNavigation();



return <View key={id} style={styles.cardContainer}>
<Image source={{uri: imageURL}}
style={{width: "100%", borderRadius: 8}} 
/>
<Text>{name}</Text>
<View style={styles.reviewMap}>
<TouchableOpacity onPress={() => navigation.navigate('Review', {id})} style={styles.iconTextBtn}>
    <IconMessage/>
    <Text style={styles.text}>{comments?.length}</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.iconTextBtn}>
    <IconLike/>
    <Text style={styles.text}>{likes}</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.iconTextBtn}>
    <IconMap/>
    <Text 
    style={[styles.text, {textDecorationLine: "underline"}]}>
        {location}
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

export default CardItem;