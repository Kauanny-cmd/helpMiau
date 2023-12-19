import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import { StackTypes } from '../../routes/authNavitagor';

import { IPost } from '../../types/IPost';
import PostList from '../../services/posts';

import Input from '../../components/Input';
import Container from '../../components/Container';
import Button from '../../components/Button';
import ImageUpload from '../../components/ImageUpload';
import MapModal from '../../components/MapModal';

import Colors from '../../global/style';
import style from './style';

const Post = () => {
  const navigation = useNavigation<StackTypes>();

  const [descricao, setDescricao] = useState<string>('');
  const [animal, setAnimal] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [userID, setUserID] = useState<string>();
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState<LatLng | null>(null);

  const openMapModal = () => {
    setMapModalVisible(true);
  };

  const closeMapModal = () => {
    setMapModalVisible(false);
  };

  const handleMarkerClick = (coordinates: LatLng) => {
    setSelectedCoordinates(coordinates);
    openMapModal();
  };

  useEffect(() => {
    if (selectedCoordinates) {
      setLatitude(selectedCoordinates.latitude);
      setLongitude(selectedCoordinates.longitude);
    }
  }, [ selectedCoordinates]);

  const setDataAsync = async () => {
    const dataStorage = await AsyncStorage.getItem('userID')
    if (dataStorage) {
      const userData = JSON.parse(dataStorage);
      setUserID(userData)
    }
  }

  const resetFields = () => {
    setDescricao('');
    setAnimal('');
    setImages([]); // Limpa as imagens
    setLatitude(0);
    setLongitude(0);
    setSelectedCoordinates(null);
  };

  const handleImageSelected = (imageUri: string) => {
    // Adiciona a URI da imagem ao estado images
    setImages(prevImages => [...prevImages, imageUri]);
    console.log(images)
  };

  const publicPost = async () => {
    setDataAsync();
    try {
      const data: IPost = {
        nomePet: animal,
        descricao: descricao,
        imagens: images,
        isPublic: true,
        localizacao: [`${latitude}`, `${longitude}`],
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
      <View style={style.container}>
        <Text style={style.textTop}>Nova postagem</Text>
        <View>
          <Text>Fotos</Text>
          <View style={style.imagesAnimal}>
            <ImageUpload onImageSelected={handleImageSelected} />
            <ImageUpload onImageSelected={handleImageSelected} />
            <ImageUpload onImageSelected={handleImageSelected} />
          </View>
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
          <Input
            style={style.textArea}
            placeholder=""
            onChange={(value) => setDescricao(value)}
            value={descricao}
          />
        </View>
        <View>
        <Text>Último local visto</Text>
          {selectedCoordinates ? (
            <MapView style={{ height: 200 }} initialRegion={{...selectedCoordinates, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>
              <Marker coordinate={selectedCoordinates} title="Selected Location" />
            </MapView>
          ) : (
            <>
              <Button onPress={openMapModal} title="Abrir Mapa" />
            </>
          )}
        </View>
        <View>
          <Text>Filtros</Text>
          <Button onPress={() => navigation.navigate('Filter')} title="Selecione os filtros clicando aqui" />
        </View>
        <Button
          onPress={() => publicPost()}
          colorBorder={Colors.primaryColor}
          colorButton={Colors.primaryColor}
          colorText={Colors.whiteColor}
          title="Publicar"
        />

      </View>
      <MapModal visible={mapModalVisible} onClose={closeMapModal} onMarkerClick={handleMarkerClick} />
    </Container>
  );
};
export default Post;