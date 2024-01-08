import { StyleSheet } from "react-native";
import Colors from '../../global/style'

const styles = StyleSheet.create({
  inputContainer: {
    marginTop:0
  },
  input: {
    backgroundColor: Colors.whiteColor,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.primaryColor,
    borderColor:Colors.primaryColor,
    borderWidth: 1,
  }
});

export default styles;