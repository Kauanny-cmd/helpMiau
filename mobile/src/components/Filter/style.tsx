import { StyleSheet } from "react-native";
import Colors from '../../global/style'

const styles = StyleSheet.create({
  contSelect: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  textTop: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    width:'90%'
  },
  viewMain: {
    height: '100%',
    width: '100%',
  },
  viewTop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 12,
  },
  viewSelect: {
    flex:1,
    padding:8
  },
  viewBtts: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    gap: 8
  },
  btt: {
    padding: 12,
    borderColor: Colors.primaryColor,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: Colors.backgroundColor,
    display: 'flex',
    color: Colors.primaryColor,
    textAlign: 'center',
    width: 180
  },
  btts: {
    padding: 12,
    borderColor: Colors.primaryColor,
    borderRadius: 6,
    borderWidth: 1,
    backgroundColor: Colors.primaryColor,
    display: 'flex',
    color: Colors.whiteColor,
    textAlign: 'center',
    width: 180
  }
});

export default styles;