import { StyleSheet } from "react-native";
import Colors  from "../../global/style"

const style = StyleSheet.create({
  container: {
    padding: 16,
    width:'100%',
    height:'100%',
    gap:12
  },
  textArea: {
    borderWidth: 1,
    borderColor: Colors.backgroundColor,
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  imagesAnimal:{
    display:'flex',
    flexDirection:'row',
    gap:4,
    justifyContent:'center'
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default style;