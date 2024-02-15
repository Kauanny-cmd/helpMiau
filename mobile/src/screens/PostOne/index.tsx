import { View, Text, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Image } from '@rneui/base';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import MapView, { Marker } from 'react-native-maps';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import { IComentario, IPost, IPostCommentData } from '../../types/IPost';
import { IUser } from '../../types/IUser';
import { StackTypes } from '../../routes/authNavitagor';
import PostList from '../../services/posts';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Delete from '../../components/Delete';

import Colors from '../../global/style';
import styles from './style';

interface LatLng {
  latitude: number;
  longitude: number;
}

interface IUserComment {
  usuarios: [
    {
      id: string;
      nome: string;
    }
  ]
}

const PostOne: React.FC = () => {
  const navigation = useNavigation<StackTypes>();
  const route = useRoute();
  const paramKey = route.params;

  const [post, setPost] = useState<IPost>();
  const [report, setReport] = useState<string>();
  const [comentarios, setComentarios] = useState<IComentario[]>()
  const [imagens, setImagens] = useState<string[]>();
  const [selectedCoordinates, setSelectedCoordinates] = useState<LatLng | null>(null);

  const [userData, setUserData] = useState<IUser>();
  const [image, setImage] = useState<string>();
  const [user, setUser] = useState<string>();
  const [userComment, setUserComment] = useState<IUserComment>()

  const [profile, setProfile] = useState<boolean>();
  const [index, setIndex] = useState<number>(0);

  const sliderWidth = Dimensions.get('window').width * 0.75;
  const slideWidth = 250;
  const horizontalMargin = 20;
  const itemWidth = slideWidth + horizontalMargin * 2;

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const carouselRef = useRef(null);

  const renderItem = ({ item }) => {
    return (
      <Image source={{ uri: item }} style={{ width: "60%", height: 200, borderRadius: 10, alignSelf: 'center' }} />
    )
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PostList.getPostId(paramKey.id);
        const userData = await getDataFromStorage('userData');

        setPost(response);
        setComentarios(response.comentarios);
        setImagens(response.imagens);

        if (userData) {
          setUserData(userData);
          if (response.comentarios.length > 0) {
            const coments = await PostList.postUserComentarios({ "comentarios": response.comentarios })
            console.log(coments)
            setUserComment(coments)
          }
        }

        setLoading(false);
        setRefreshing(false);
      } catch (error) {
        console.error('Erro na tela Home:', error);
        setRefreshing(false);
      }
    };

    const getDataFromStorage = async (key: string): Promise<UserData | null> => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        if (jsonValue !== null) {
          const data = JSON.parse(jsonValue) as UserData;
          //console.log('Dados recuperados do AsyncStorage:', data);
          return data;
        } else {
          console.log('Nenhum dado encontrado para a chave:', key);
          return null;
        }
      } catch (error) {
        console.error('Erro ao recuperar dados do AsyncStorage:', error);
        return null;
      }
    };

    const fetchUserData = async () => {
      try {
        const responseUserPost = await PostList.getPostUser(post?.usuario);
        setUser(responseUserPost.nome);
        //console.log("Dados user: ", user);
        if (responseUserPost.avatarUrl) {
          setProfile(true);
          setImage(responseUserPost.avatarUrl);
        }
      } catch (error) {
        console.error('Erro ao obter dados do usuário do post:', error);
      }
    };

    const fetchSelectedCoordinates = () => {
      if (post && post.localizacoes) {
        const latitude = parseFloat(post.localizacoes[0]);
        const longitude = parseFloat(post.localizacoes[1]);
        const coordinates: LatLng = { latitude, longitude };
        setSelectedCoordinates(coordinates);
      }
    };

    fetchData();
    fetchUserData();
    fetchSelectedCoordinates();
  }, [post?.usuario, refreshing]);

  const resetFields = () => {
    setReport('');
  };

  const reportPost = async () => {
    try {
      const data: IPostCommentData = {
        descricao: report,
        userId: userData?.id,
        postId: post?.id,
      };

      const response = await PostList.postReport(data.postId, data);
      console.log('Resposta da solicitação:', response);
      resetFields();

      if (response) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Sucesso!',
          textBody: 'Reporte enviado!',
          autoClose: 2000
        })
        setRefreshing(true);
      }
    } catch (error) {
      console.error('Erro ao publicar:', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleEncontradoPress = () => {
    toggleModal();
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePost(post?.id, userData?.id);
      toggleModal();
    } catch (error) {
      console.error('Erro ao excluir postagem:', error);
    }
  };

  const deletePost = async (postId: string, userId: string) => {
    try {
      setLoadingDelete(true)
      const deletedPost = await PostList.deletePost(postId, userId);
      console.log(deletedPost);
      navigation.navigate('Bichinhos');
    } catch (error) {
      console.error('Erro ao excluir postagem:', error);
    } finally {
      setLoadingDelete(false);
    }
  }

  const getUserDisplayName = (userId: string): string => {
    const user = userComment?.usuarios.find(user => user.id === userId);
    return user ? user.nome : 'Usuário';
  };

  return (
    <Container backgroundColor={'#F8F9FA'}>
      <AlertNotificationRoot>
        {
          loading ?
            <View style={{ ...styles.centerElements, height: '82%' }}>
              <Image source={require("../../../assets/dogWalking.gif")} style={styles.gif} />
            </View>
            :
            <ScrollView>
              <View style={styles.viewTop}>
                <View style={{ width: '75%' }}>
                  <Text >{post?.nomePet}</Text>
                  <Text>Postado por {user}</Text>
                </View>
                <View style={styles.viewPerfil}>
                  {profile ? (
                    <Image source={{ uri: image }} style={styles.profile} />
                  ) : (
                    <Image source={require('../../../assets/noPerfil.png')} style={styles.profile} />
                  )}
                </View>
              </View>
              <View style={styles.centerElements}>
                <Carousel
                  ref={carouselRef}
                  layout="default"
                  data={post?.imagens}
                  renderItem={renderItem}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  onSnapToItem={(index) => setIndex(index)}
                  loop={false}
                  contentContainerCustomStyle={styles.carousel}
                />
                <View style={styles.paginationContainer}>
                  <Pagination
                    dotsLength={imagens?.length}
                    activeDotIndex={index}
                    dotStyle={styles.paginationDot}
                    inactiveDotOpacity={0.9}
                    inactiveDotScale={0.6}
                    tappableDots={true}
                    inactiveDotStyle={styles.paginationInactiveDot}
                  />
                </View>
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
                <View style={{ gap: 8 }}>
                  {comentarios && comentarios.length > 0 ? (
                    comentarios.map((item: IComentario, index: number) => (
                      <View style={styles.comentarios}>
                        <Text key={index} style={styles.textComment}>{item.descricao}</Text>
                        <Text style={{ fontWeight: '600' }}>Postado por {getUserDisplayName(item.userId)}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.txtBotao}>Nenhum reporte postado</Text>
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
                  userData?.id == post?.usuario ?
                    <Button
                      onPress={handleEncontradoPress}
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
        }
        {/* Modal de exclusão */}
        <Delete
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
          handleConfirmDelete={handleConfirmDelete}
          postId={post?.id || ''} // Verifica se post e post.id existem antes de acessar
          userId={userData?.id || ''}
          loading={loadingDelete}
        />
      </AlertNotificationRoot>
    </Container >
  );
};

export default PostOne;