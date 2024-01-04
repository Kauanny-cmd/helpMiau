import { StyleSheet } from "react-native";
import Colors  from "../../global/style"

const style = StyleSheet.create({
  container: {
   padding:4,
   marginTop:12
  },
  textTop:{
    fontSize:20,
    fontWeight:'500',
    textAlign: 'center',
  },
  subText:{
    fontSize:14,
    fontWeight:'400',
  },
  imagesAnimal:{
    display:'flex',
    flexDirection:'row',
    gap:8,
    justifyContent:'center',
    padding:4
  },
  map: {
    width: '100%',
    height: 130,
    borderRadius:20
  },
  containerView:{
    gap:8
  },
  btt:{
    backgroundColor: Colors.primaryLightColor,
    width:'100%',
    justifyContent:'center',
    borderRadius:4,
    padding:12,
  },
  txtBotao:{
    fontSize:12,
    color: Colors.primaryColor,
  }
});

export default style;