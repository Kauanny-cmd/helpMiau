import { StyleSheet } from "react-native";
import Colors from '../../global/style'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryDarkColor,
    borderRadius: 22,
    width:100,
    margin: 2
  },
  txtContainer: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontSize: 14,
    color: Colors.darkColor,
    textAlign:'center',
  },
  selectedContainer:{
    backgroundColor: Colors.secondaryColor,
  },
  selectedTxt:{
    color: Colors.whiteColor,
  }
});

export default styles;