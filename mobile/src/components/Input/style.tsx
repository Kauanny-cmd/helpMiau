import { StyleSheet } from "react-native";
import Colors from '../../global/style'

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 8,
  },
  input: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: Colors.grayText,
    borderRadius: 3,
    margin: 0,
  },
  InputLable: {
    marginBottom: 8,
    fontWeight: "500",
    color: 'red',
  },
  disable: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingHorizontal: 0,
    marginTop: 0,
    paddingVertical: 0,
    margin: 0,
    padding: 0
  },
});

export default styles;