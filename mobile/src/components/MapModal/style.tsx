import { StyleSheet } from "react-native";
import Colors from '../../global/style';

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    position: 'relative',
  },
  arrowBtt: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 44,
    height: 44,
    zIndex: 1,  
    backgroundColor:Colors.secondaryColor,
    borderRadius:50,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 12,
    left: '25%',
    width: '50%',
    height: 50,
    zIndex: 1,
  },
});

export default styles;