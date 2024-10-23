import { StyleProp, StyleSheet, TextInput, View, ViewProps, ViewStyle } from "react-native"
import { colors } from "../styles/global";
import { FC, useState } from "react";

type inputProps = {
    value: string,
    placeholder?: string,
    outerStyles?: StyleProp<ViewStyle>,
    rightButton?: React.ReactNode,
    onTextChange: (value: string) => void,
    secureTextEntry?: boolean
}

const Input: FC<inputProps> = ({
    placeholder, 
    outerStyles, 
    rightButton, 
    onTextChange, 
    value, 
    secureTextEntry = false
}) => {

    const [isFocused, setIsFocused] = useState(false);


return <View 
        style={[styles.input, outerStyles, isFocused && styles.inputFocused]}
        >
    <TextInput 
    value={value}
    placeholder={placeholder} 
    onChangeText={onTextChange}
    secureTextEntry={secureTextEntry}
    style={styles.textInput}
    autoCapitalize="none"
    onFocus={() => setIsFocused(true)} 
    onBlur={() => setIsFocused(false)}
    />
    {rightButton}
</View>

}

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.BGInput,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.borderInput,
        paddingRight: 16
        
    },
textInput: {
    color: colors.blueLight,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 18,
    padding: 16,
    height: 50,
    },
    inputFocused: {
        borderColor: colors.orangeMain
      },
})

export default Input;