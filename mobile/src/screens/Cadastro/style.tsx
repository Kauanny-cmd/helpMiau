import { StyleSheet } from "react-native";
import Colors from '../../global/style'

const style = StyleSheet.create({
  imageIcon: {
    width: 150,
    height: 150,
    marginBottom: 40
  },
  foco: {
    width: 320,
  },
  textPar: {
    fontSize: 14,
    marginTop: 8,
    color: Colors.primaryColor,
    textAlign: "center",
  },
  errorText: {
    color: Colors.dangerColor,
    fontSize: 12,
    marginTop: 5
  }
});

export default style;