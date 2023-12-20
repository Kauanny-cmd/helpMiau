import { StyleSheet } from "react-native";
import Colors from '../../global/style'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    borderRadius: 22,
  },
  txtContainer: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontSize: 14,
    color: Colors.darkColor,
  },
  selectedContainer:{
    backgroundColor: Colors.secondaryColor,
  },
  selectedTxt:{
    color: Colors.whiteColor,
  }
});

export default styles;