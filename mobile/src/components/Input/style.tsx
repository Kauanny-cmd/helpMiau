import { StyleSheet } from "react-native";
import Colors from '../../global/style'

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 8
  },
  input: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.primaryColor,
    borderRadius: 10,
    borderColor:Colors.primaryColor,
    borderWidth: 1,
  }
});

export default styles;