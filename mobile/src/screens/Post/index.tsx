import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IPost } from '../../types/IPost';
import PostList from '../../services/posts';

import Input from '../../components/Input';
import Container from '../../components/Container';
import Button from '../../components/Button';
import ImageUpload from '../../components/ImageUpload';

import Colors from '../../global/style';
import style from './style';

const Post = () => {
  const [text, setText] = useState<string>('');
  const [animal, setAnimal] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [userID, setUserID] = useState<string>()

  const teste = async () => {
    const dataStorage = await AsyncStorage.getItem('userID')
    if (dataStorage) {
      const userData = JSON.parse(dataStorage);
      setUserID(userData)
    }
  }
  teste()
  const resetFields = () => {
    setText('');
    setAnimal('');
    setImages([]); // Limpa as imagens
  };

  const handleImageSelected = (imageUri: string) => {
    // Adiciona a URI da imagem ao estado images
    setImages(prevImages => [...prevImages, imageUri]);
    console.log(images)
  };

  const publicPost = async () => {
    teste();
    try {
      const data: IPost = {
        nomePet: animal,
        descricao: text,
        imagens: images,
        isPublic: true,
        localizacao: ['latitude', 'longitude'],
        filtros: ['filtro1', 'filtro2'],
        userId: userID,
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
      <View>
        <Text>Nova postagem</Text>
        <View>
          <Text>Fotos</Text>
          <ImageUpload onImageSelected={handleImageSelected} />
        </View>
        <View>
          <Text>Nome do animal</Text>
          <Input
            placeholder=""
            value={animal}
            onChange={(value) => setAnimal(value)}
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
          colorBorder={Colors.primaryColor}
          colorButton={Colors.primaryColor}
          colorText={Colors.whiteColor}
          title="Publicar"
        />
      </View>
    </Container>
  );
};
export default Post;