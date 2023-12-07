import { View, Text, TextInput } from 'react-native';
import  { useState } from 'react'

import Container from '../../components/Container';
import Button from '../../components/Button';
import style from './style'
import Colors from '../../global/style'
import PostList from '../../services/posts';
import Input from '../../components/Input';
import { IPost } from '../../types/IPost';

const Post = () => {
  const [text, setText] = useState('');
  const [animal, setAnimal] = useState('');

  const resetFields = () => {
    setText('');
    setAnimal('');
  };

  const publicPost = async () => {
    try {
      const data: IPost = {
        nomePet: animal,
        descricao: text,
        imagens: ['url_da_imagem'],
        isPublic: true,
        localizacao: ['latitude', 'longitude'],
        filtros: ['filtro1', 'filtro2'],
        userId: '0d981edf-8ecf-4292-aa29-efdce427febf',
      };

      const response = await PostList.postData(data);
      console.log('Resposta da solicitação:', response);
      resetFields();
    } catch (error) {
      console.error('Erro ao publicar:', error);
    }
  };

  return (
    <Container backgroundColor={'#F8F9FA'}>
      <View >
        <Text >Nova postagem</Text>
        <View>
          <Text>Fotos</Text>
        </View>
        <View>
          <Text>Nome do animal</Text>
         <Input 
         placeholder=""
         value={animal}
         onChange={(value)=>setAnimal(value)}
         />
        </View>
        <View>
          <Text>Descrição</Text>
          <TextInput
            style={style.textArea}
            placeholder="Type here..."
            multiline={true}
            numberOfLines={4} 
            onChangeText={(value) => setText(value)}
            value={text}
          />
        </View>
        <View>
          <Text>Último local visto</Text>
        </View>
        <View>
          <Text>Filtros</Text>

        </View>
        <Button 
        onPress={() => publicPost()}
        colorBorder={Colors.primaryColor} colorButton={Colors.primaryColor} colorText={Colors.whiteColor} title='Publicar'
        />
      </View>
    </Container>
  );
};
export default Post;