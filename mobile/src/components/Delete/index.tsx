import { Modal, View, Text, } from "react-native";

import Button from "../Button";

import Colors from '../../global/style';
import style from './style'

interface DeleteProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  handleConfirmDelete: (postId: string, userId: string) => void;
  postId: string; 
  userId: string; 
}

const Delete: React.FC<DeleteProps> = ({ isModalVisible, toggleModal, handleConfirmDelete, postId, userId }) => {
  return(
    <Modal visible={isModalVisible} statusBarTranslucent={true} transparent={true}>
    <View style={style.container}>
    <View style={style.viewMain}>
       <Text style={{fontSize:16}}>Deseja excluir a postagem?</Text>
       <View style={style.btts}>
         <Button 
         title="Cancelar"
         colorBorder={Colors.dangerColor}
         colorButton={Colors.backgroundColor}
         colorText={Colors.dangerColor}
         onPress={toggleModal} 
         />
         <Button 
         title="Confirmar"
         colorBorder={Colors.primaryColor}
         colorButton={Colors.primaryColor}
         colorText={Colors.whiteColor}
         onPress={() => handleConfirmDelete(postId, userId)} 
         />
       </View>
     </View>
    </View>
   </Modal>
  )
}
export default Delete