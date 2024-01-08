import styles from "./style";
import Colors from '../../global/style'
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

type propsInput ={
    placeholder: string,
    password?: boolean,
    value: string,
    onChange: (value:string) => void,
    height?: number,
    borderRadius?: number,
}

const Input = ({
    placeholder,
    password,
    value,
    onChange,
    height,
    borderRadius
}: propsInput) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder={placeholder ? placeholder : ""}
                placeholderTextColor={Colors.primaryColor}
                secureTextEntry={password}
                style={{
                    ...styles.input,
                    height:height,
                    borderRadius: borderRadius ? borderRadius : 10
                }}
                onChangeText={(e) => onChange(e)}
                value={value}
            />
        </View >
    );
};

export default Input;