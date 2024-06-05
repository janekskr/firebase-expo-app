import { TextInput, StyleSheet, TextInputProps, ViewStyle, TextStyle, View } from 'react-native'

import { Text } from "./Themed"
import { Feather } from '@expo/vector-icons';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { FC, useState } from 'react';
import { Weights } from '@/lib/types';
import colors from '@/constants/Colors';

interface InputProps extends TextInputProps {
    weight?: Weights
    placeholder?: string;
    icon?: any
    name: string;
    controls?: {
        control: Control<any>;
        errors: FieldErrors<any>;
    },
    inputStyle?: TextStyle,
    containerStyle?: ViewStyle
    iconStyle?: TextStyle
    inputColor?: string
    style?: ViewStyle
    placeholderColor?: string
} 

const Input: FC<InputProps> = ({ weight="regular",style, placeholder, inputColor,controls, placeholderColor, inputStyle, containerStyle, name, iconStyle, icon, ...rest }) => {
    const error = controls?.errors[name]
    const [errorText, setErrorText] = useState(error)
    return (
        <View style={style}>
            <View
                style={[styles.inputContainer, containerStyle]}
            >
                {icon && <Feather name={icon} size={23} color={error ? "red" : placeholderColor ?? colors.gray}  style={[styles.icon, iconStyle]}/>}
                <Controller
                    control={controls?.control}
                    name={name}
                    render={({ field: { value, onChange } }) =>
                        <TextInput
                            {...rest}
                            value={errorText ? "" : value}
                            onFocus={() => setErrorText(undefined)}
                            onChangeText={onChange}
                            style={[styles.input, {fontFamily: `poppins_${weight}`}, error && {borderColor: "red"}, inputStyle]}
                            id={name}
                            placeholder={error ? error.message as string : placeholder || ""}
                            placeholderTextColor={error ? "red" : placeholderColor ?? colors.gray}
                            autoCapitalize="none"
                        />
                    }
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
   },
    icon: {
        marginRight: 10
    },
    input: {
        fontSize: 14,
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "lightgray",
        paddingTop: 8,
        paddingBottom: 4,
        paddingLeft: 2
    },
    errorText: {
        color: "red"
    }
})

export default Input
