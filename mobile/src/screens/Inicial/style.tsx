import { StyleSheet } from "react-native";
import Colors from '../../global/style'

const style = StyleSheet.create({
  foco:{
    gap: 8
  },
  textTitle: {
    fontSize: 38,
    paddingHorizontal: 2,
    fontWeight: "500",
    color: Colors.primaryColor
  },
  textPar: {
    fontSize: 18,
    paddingHorizontal: 2,
    color: Colors.primaryColor,
    textAlign: "auto",
    marginBottom: 10
  },
});

export default style;