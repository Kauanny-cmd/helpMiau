import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

import styles from "./style";
import Colors from '../../global/style';

type propsInput = {
    placeholder: string,
    password?: boolean,
    value: string | undefined,
    onChange: (value: string) => void,
    height?: number,
    borderRadius?: number,
    editable?: boolean,
    borderColor?: string
}

const Input = ({
    placeholder,
    password,
    value,
    onChange,
    height,
    borderRadius,
    editable,
    borderColor
}: propsInput) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder={placeholder ? placeholder : ""}
                placeholderTextColor={Colors.primaryColor}
                secureTextEntry={password}
                style={{
                    ...styles.input,
                    height: height,
                    borderRadius: borderRadius ? borderRadius : 10,
                    borderColor: borderColor ? borderColor : Colors.primaryColor,
                }}
                onChangeText={(e) => onChange(e)}
                value={value}
                editable={editable}
            />
        </View >
    );
};

export default Input;