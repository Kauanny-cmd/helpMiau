import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { Image } from '@rneui/base';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IComentario, IPost, IPostCommentData } from '../../types/IPost';
import PostList from '../../services/posts';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Container from '../../components/Container';

import Colors from '../../global/style'

const PostOne = () => {
  const [post, setPost] = useState<IPost>();
  const [report, setReport] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [comentarios, setcomentarios] = useState<IComentario[]>()

  const route = useRoute();
  const paramKey = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PostList.getPostId(paramKey.id);
        setPost(response);
        console.log("Dados: ", response);
        setcomentarios(response.comentarios)
      } catch (error) {
        console.error('Erro na tela Home:', error);
      }
    }
    const setIdStorage = async () => {
      const dataStorage = await AsyncStorage.getItem('userEmail')
      if (dataStorage) {
        const userData = JSON.parse(dataStorage);
        setUserId(userData)
      }
    }
    fetchData();
    setIdStorage();
  }, [])

  const resetFields = () => {
    setReport('');
  };

  const reportPost = async () => {
    try {
      const data: IPostCommentData = {
        descricao: report,
        userId: userId,
        postId: paramKey.id,
      };

      const response = await PostList.postReport(paramKey.id, data);
      console.log('Resposta da solicitação:', response);
      resetFields();
    } catch (error) {
      console.error('Erro ao publicar:', error);
    }
  };

  return (
    <Container backgroundColor={'#F8F9FA'}>
      <View >
        <Image src={post?.imagens[0]} style={{ width: 340, height: 280, tintColor: 'transparent' }} />
        <Text >{post?.nomePet}</Text>
      </View>
      <View>
        <Text>Avisos</Text>
        {comentarios && comentarios.length > 0 ? (
          comentarios.map((item: IComentario, index: number) => (
            <Text key={index}>{item.descricao}</Text>
          ))
        ) : (
          <Text>Nenhum aviso disponível</Text>
        )}
      </View>
      <View>
        <Input
          placeholder="Adicionar aviso"
          value={report}
          onChange={(value) => setReport(value)} />
        <Button
          onPress={() => reportPost()}
          colorBorder={Colors.primaryColor}
          colorButton={Colors.primaryColor}
          colorText={Colors.whiteColor}
          title="Reportar"
        />
      </View>
    </Container>
  );
};
export default PostOne;