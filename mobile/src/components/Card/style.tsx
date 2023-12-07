import { StyleSheet } from "react-native";
import Colors from "../../global/style";

const style = StyleSheet.create({
  container:{
    display: 'flex',
    backgroundColor:`${Colors.backgroundColor}`,
    alignItems: 'flex-start',
    borderRadius:8,
    shadowColor:`${Colors.grayText}`,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 4,
    elevation: 4,
    margin: 12,
    width:160,
    height:260,
    paddingBottom:10
  },
  textCard:{
    padding: 8,
  },
  fontCard:{
    textAlign: 'justify',
    fontSize: 14,
    fontWeight:'700',
    textColor:`${Colors.grayText}`
  }
})

export default style