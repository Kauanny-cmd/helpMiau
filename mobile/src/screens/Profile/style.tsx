import { StyleSheet } from "react-native";
import Colors from '../../global/style'

const style = StyleSheet.create({
  container: {
    width: '94%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ff4',
    justifyContent:'space-between',
    margin:0
  },
  topMain: {
    display: 'flex',
    backgroundColor: '#f2f',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  main: {
    gap: 12
  },
  label: {
    color: Colors.grayTextColor4,
    fontSize: 14
  },
  textLabel: {
    color: Colors.darkColor,
    fontSize: 16
  }
})

export default style;