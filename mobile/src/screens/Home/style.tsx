import { StyleSheet } from "react-native";
import Colors from '../../global/style'

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
  },
  image: {
    borderRadius: 100,
    width: 50,
    height: 50
  },
  imageLogo: {
    width: '80%',
    alignItems: 'center'
  },
  subTop: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'

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
});

export default style;