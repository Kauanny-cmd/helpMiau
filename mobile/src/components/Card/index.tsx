import { Image, Text, View } from "react-native"
//import Container from "../Container"
import { IPost } from "../../types/IPost"
import style from "./style"

const Card = ({
  data
}: IPost) => {
  return (
    //<Container>
      <View style={style.container}>
      <Image source={{ uri: data.imagens[0] }} style={{ width: 160, height: 188, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
        <View style={style.textCard}>
          <Text style={style.fontCard}>{data.nomePet}</Text>
          <Text style={style.fontCard}>{data.descricao}</Text>
        </View>
      </View>
    //</Container>
  )
}
export default Card