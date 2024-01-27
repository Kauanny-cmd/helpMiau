import { StyleSheet } from "react-native";
import Colors from "../../global/style"

const style = StyleSheet.create({
  container: {
    padding: 0,
  },
  textTop: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    fontWeight: '400',
  },
  editText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.primaryColor
  },
  viewEdit: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imagesAnimal: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    padding: 4
  },
  map: {
    width: '100%',
    height: 130,
    borderRadius: 20
  },
  containerView: {
    gap: 8
  },
  btt: {
    backgroundColor: Colors.primaryLightColor,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 12,
  },
  txtBotao: {
    fontSize: 12,
    color: Colors.primaryColor,
  },
  viewFilters: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center'
  }
});

export default style;