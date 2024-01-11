import { StyleSheet } from "react-native";
import Colors from '../../global/style'

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  topMain: {
    display: 'flex',
    backgroundColor: '#f2f',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  profile: {
    width: 90,
    height: 90,
    borderRadius: 100
  },
  main: {
    gap: 14,
    height: '70%',
    padding: 16
  },
  section: {
    gap: 4
  },
  editSection: {
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEdit: {
    position: 'absolute',
    left: '56%',
    top: '6%',
    backgroundColor: Colors.primaryColor,
    borderRadius: 50, // A metade do tamanho desejado
    width: 24, 
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:2,
    paddingLeft:2
  },
  label: {
    color: Colors.grayTextColor4,
    fontSize: 14
  },
  textLabel: {
    color: Colors.darkColor,
    fontSize: 16
  },
  viewFooter: {
    width: '100%',
    gap: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 32
  },
  button: {
    width: '40%',
  },
  card:{
    height:'80%',
    width: '94%',
    borderWidth:1,
    padding:12,
    justifyContent: 'space-between',
    flexDirection:'column',
    alignContent: 'center',
    borderRadius:10,
    borderColor:Colors.grayTextColor4,
  },
  imagePicker: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width:'53%',
    height:150,
    borderRadius:10,
  },
})

export default style;