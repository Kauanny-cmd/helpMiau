import { StyleSheet } from "react-native";
import Colors from '../../global/style';

const style = StyleSheet.create({
  subTop: {
    width: '94%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center'
  },
  textPar: {
    fontSize: 14,
    marginTop: -16,
    color: Colors.darkColor,
    textAlign: 'justify',
    padding: 12
  },
  viewGif: {
    height: '82%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: 130,
    height: 130,
    marginTop: 30
  }
});

export default style;