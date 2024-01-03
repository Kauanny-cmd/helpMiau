import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { Image } from '@rneui/base';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MapView, { Marker } from 'react-native-maps';

import { IComentario, IPost, IPostCommentData } from '../../types/IPost';
import PostList from '../../services/posts';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Container from '../../components/Container';
import MapModal from '../../components/MapModal';

import logo from '../../../assets/HelpMiAu.png'
import logoNome from '../../../assets/HelpMiAu.png'
import semFoto from '../../../assets/noPerfil.png'

import Colors from '../../global/style';

interface LatLng {
  latitude: number;
  longitude: number;
}

const PostOne = () => {
  const [post, setPost] = useState<IPost>();
  const [report, setReport] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [comentarios, setcomentarios] = useState<IComentario[]>()
  const [imagens, setimagens] = useState<string[]>();
  const [selectedCoordinates, setSelectedCoordinates] = useState<LatLng | null>(null);
  const [profile, setProfile] = useState<boolean>();

  const windowWidth = Dimensions.get('window').width;
  const itemWidth = windowWidth - 40;

  const route = useRoute();
  const paramKey = route.params;
  const renderItem = ({ item }) => (
    <Text>{item}</Text>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PostList.getPostId(paramKey.id);
        setPost(response);
        console.log("Dados: ", response);
        setcomentarios(response.comentarios)
        setimagens(response.imagens)
        setProfile(false)
        //
        const latitude = parseFloat(response.localizacoes[0])
        const longitude = parseFloat(response.localizacoes[1])
        const coordinates: LatLng = { latitude, longitude };
        setSelectedCoordinates(coordinates)
        //
        console.log(selectedCoordinates)
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
      <Image source={logo} style={{ width: 160, height: 38 }} />
      <ScrollView>
        <View>
          <Text >{post?.nomePet}</Text>
          <Text>Postado por {post?.userId}</Text>
          {
            profile ? <Image source={logoNome} style={{ borderRadius: 100, width: 60, height: 60 }} /> :
              <Image source={semFoto} style={{ borderRadius: 100, width: 60, height: 60 }} />
          }
        </View>

        <View >
          <Carousel
            data={post?.imagens}
            renderItem={renderItem}
            sliderWidth={windowWidth}
            itemWidth={itemWidth}
            layout="default"
          />
          {/* Adicione um indicador de paginação se desejar */}
          {/*  <Pagination
            dotsLength={imagens?.length}
            activeDotIndex={0} // Pode ser vinculado ao estado se quiser
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
            inactiveDotStyle={styles.paginationInactiveDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          /> */}

        </View>
        <View>
          <Text>{post?.descricao}</Text>
        </View>
        <View>
          <Text>Mapa</Text>
          {selectedCoordinates ? <MapView style={{ height: 200 }} initialRegion={{
            ...selectedCoordinates, latitude: selectedCoordinates?.latitude, longitude: selectedCoordinates?.longitude, latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
            <Marker coordinate={selectedCoordinates} title="Selected Location" />
          </MapView> : <Text>Carregando localizações</Text>
          }
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
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  carouselImage: {
    width: '100%',
    height: 200, // Altura desejada
    borderRadius: 10, // Borda arredondada, ajuste conforme necessário
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 8,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#333', // Cor dos pontos ativos
  },
  paginationInactiveDot: {
    backgroundColor: '#999', // Cor dos pontos inativos
  },
});
export default PostOne;