import {  StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"
import {FC} from "react"
import { colors } from "../styles/global"

type ButtonProps = {
    children: React.ReactNode,
    buttonStyle?: ViewStyle,
    onPress: () => void
}

const Button: FC<ButtonProps> = ({children, onPress, buttonStyle}) => {
    return <TouchableOpacity 
    style={[styles.mainButton, buttonStyle]} 
    onPress={onPress}>
           {children}
        </TouchableOpacity>
   
}

const styles = StyleSheet.create({
    mainButton: {
backgroundColor: colors.orangeMain,
paddingTop: 16,
paddingBottom: 16,
borderRadius: 100,
paddingHorizontal: 32
    }
})

export default Button;