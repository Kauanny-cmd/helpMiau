import { View, Text } from "react-native";
import styles from "./style";
import { Input as InputUI } from "@rneui/themed";

type propsInput ={
    label: string,
    placeholder: string,
    password: boolean,
    value: string,
    error: string,
    onChange: (value:string) => void,
}

const Input = ({
    label,
    placeholder,
    password,
    value,
    error,
    onChange,
}: propsInput) => {
    return (
        <View style={styles.inputContainer}>
            {label ? <Text style={styles.InputLable}>{label}</Text> : null}
            <InputUI
                placeholder={placeholder ? placeholder : ""}
                secureTextEntry={password}
                style={styles.input}
                inputContainerStyle={styles.disable}
                containerStyle={styles.disable}
                onChangeText={(e) => onChange(e)}
                value={value}
                errorMessage={error}
            />
        </View>
    );
};

export default Input;