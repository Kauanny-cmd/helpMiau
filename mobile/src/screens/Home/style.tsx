import { StyleSheet } from "react-native";
import Colors from '../../global/style';
import Fonts from '../../global/fonts';


const style = StyleSheet.create({
  topMain: {
    width: '100%',
    height: '10%',
    paddingTop: 12,
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom:12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },
  image: {
    borderRadius: 100,
    width: 40,
    height: 40
  },
  imageLogo: {
    width: '80%',
    alignItems: 'center'
  },
  subTop: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:8,
    alignItems: 'center'
  },
  textPar: {
    fontSize: 14,
    marginTop: 8,
    color: Colors.darkColor,
    textAlign:'justify',
    padding:12
  },
  errorText: {
    color: Colors.dangerColor,
    fontSize: 12,
    marginTop: 5
  },
});

export default style;