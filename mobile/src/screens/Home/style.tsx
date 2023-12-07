import { StyleSheet } from "react-native";
import Colors from '../../global/style'

const style = StyleSheet.create({
  topMain: {
    width: '100%',
    height: '10%',
    paddingTop: 12,
    paddingLeft: 18,
    paddingRight: 18,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 60
  },
  subTop: {
    width: '90%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
    
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
  },
  cards:{
    backgroundColor: Colors.primaryColor
  }
});

export default style;