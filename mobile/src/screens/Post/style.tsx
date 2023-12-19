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
  textTop:{
    fontSize:20,
    fontWeight:'400',
    textAlign: 'center',
  },
  imagesAnimal:{
    display:'flex',
    flexDirection:'row',
    gap:4,
    justifyContent:'center'
  },
  map: {
    width: '50%',
    height: '50%',
  },
});

export default style;