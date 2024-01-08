import { StyleSheet } from "react-native";
import Colors from '../../global/style'

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    opacity: 1
  },
  viewMain: {
    backgroundColor: Colors.backgroundColor,
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    padding: 20, borderRadius: 8,
    width: 280,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24
  },
  btts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16
  }
});

export default style;