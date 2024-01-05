import { View, Text, Dimensions, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
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

import logo from '../../../assets/HelpMiAu.png'
import logoNome from '../../../assets/HelpMiAu.png'
import semFoto from '../../../assets/noPerfil.png'

import Colors from '../../global/style';
import styles from './style';

interface LatLng {
  latitude: number;
  longitude: number;
}

const PostOne = () => {
  const [post, setPost] = useState<IPost>();
  const [report, setReport] = useState<string>();
  const [comentarios, setcomentarios] = useState<IComentario[]>()
  const [imagens, setimagens] = useState<string[]>();
  const [selectedCoordinates, setSelectedCoordinates] = useState<LatLng | null>(null);

  const [userId, setUserId] = useState<string>();
  const [userIdBD, setUserIdBD] = useState<string>();

  const [profile, setProfile] = useState<boolean>();
  const [index, setIndex] = useState<number>(0);

  const windowWidth = Dimensions.get('window').width;
  const itemWidth = windowWidth - 40;

  const route = useRoute();
  const paramKey = route.params;
  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ width: "60%", height: 200, borderRadius: 10 }} />
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
        setUserIdBD(response.usuario)
        //
        const latitude = parseFloat(response.localizacoes[0])
        const longitude = parseFloat(response.localizacoes[1])
        const coordinates: LatLng = { latitude, longitude };
        setSelectedCoordinates(coordinates)
        //
        //console.log(selectedCoordinates)
      } catch (error) {
        console.error('Erro na tela Home:', error);
      }
    }

    const setIdStorage = async () => {
      //const dataStorage = await AsyncStorage.getItem('userEmail');
      const dataId = await AsyncStorage.getItem('userID');
      if (dataId) {
        const userData = JSON.parse(dataId);
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
      if (response) {
        Alert.alert(
          'Reporter realizado com sucesso!',
          '',
          [
            { text: 'Ok'}
          ]
        );
      }
    } catch (error) {
      console.error('Erro ao publicar:', error);
    }
  };

  return (
    <Container backgroundColor={'#F8F9FA'}>
      <Image source={logo} style={{ width: 120, height: 28, marginTop: 18 }} />
      <ScrollView>
        <View style={styles.viewTop}>
          <View style={{ width: '75%'/* , backgroundColor:'#448' */ }}>
            <Text >{post?.nomePet}</Text>
            <Text>Postado por {post?.userId}</Text>
          </View>
          <View style={{ flexDirection: 'row', display: "flex", width: '25%', alignItems: 'center', justifyContent: 'flex-end' }}>
            {
              profile ? <Image source={logoNome} style={{ borderRadius: 100, width: 60, height: 60 }} /> :
                <Image source={semFoto} style={{ borderRadius: 100, width: 40, height: 40 }} />
            }
          </View>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center', gap: 24 }}>
          <Carousel
            layout="default"
            data={post?.imagens}
            renderItem={renderItem}
            sliderWidth={windowWidth}
            itemWidth={itemWidth}
            onSnapToItem={(index) => setIndex(index)}
          />
          <Pagination
            dotsLength={imagens?.length}
            activeDotIndex={index}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.92)'
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </View>
        <View style={styles.viewDescription}>
          <Text>{post?.excerpt}</Text>
        </View>
        <View style={styles.viewMap}>
          <Text>Última localização</Text>
          {selectedCoordinates ?
            <MapView style={{ ...styles.map, borderRadius: 10, flex: 1 }}
              region={{
                ...selectedCoordinates,
                latitude: selectedCoordinates?.latitude,
                longitude: selectedCoordinates?.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}

            >
              <Marker coordinate={selectedCoordinates} title="Localização selecionada" />
            </MapView>
            :
            <Text>Carregando localizações</Text>
          }
        </View>
        <View style={styles.viewAvisos}>
          <Text>Avisos</Text>
          <View style={{gap:8}}>
            {comentarios && comentarios.length > 0 ? (
              comentarios.map((item: IComentario, index: number) => (
                <View style={styles.comentarios}>
                  <Text key={index} style={styles.textComment}>{item.descricao}</Text>
                  <Text style={{fontWeight:'600'}}>Postado por </Text>
                </View>
              ))
            ) : (
              <Text>Nenhum aviso disponível</Text>
            )}
          </View>
        </View>
        <View style={styles.viewFooter}>
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
            elevation={4}
          />
          {
            userIdBD != userId ? // colocar ==
              <Button
                //onPress={() => reportPost()}
                colorBorder={Colors.secondaryColor}
                colorButton={Colors.secondaryColor}
                colorText={Colors.whiteColor}
                title="Encontrado!"
                elevation={4}
              />
              :
              <></>
          }
        </View>
      </ScrollView>
    </Container>
  );
};

export default PostOne;