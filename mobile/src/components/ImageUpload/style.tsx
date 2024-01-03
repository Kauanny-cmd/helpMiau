import { StyleSheet } from "react-native";
import Colors from "../../global/style";

const style = StyleSheet.create({
  container:{
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    borderRadius:10,
    width:'30%',
    height:150,
    alignItems:'center',
    justifyContent:'center',
  },
  imagePicker: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width:'53%',
    height:150,
    borderRadius:10,
  },
  textImage:{
    color:Colors.primaryColor
  }
})

export default style