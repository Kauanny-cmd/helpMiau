import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';

import { IPost } from '../../types/IPost';
import PostList from '../../services/posts';

import Input from '../../components/Input';
import Container from '../../components/Container';
import Button from '../../components/Button';
import ImageUpload from '../../components/ImageUpload';
import MapModal from '../../components/MapModal';
import FilterModal from '../../components/Filter';
import Select from '../../components/Select';

import Colors from '../../global/style';
import style from './style';

interface selections {
  Tipo: string
  Porte: string
  Cor: string
  FaseVida: string
  Sexo: string
}

const Post = () => {
  const [descricao, setDescricao] = useState<string>('');
  const [animal, setAnimal] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [userID, setUserID] = useState<string>();
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState<LatLng | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string | null }>({});

  const openMapModal = () => {
    setMapModalVisible(true);
  };

  const closeMapModal = () => {
    setMapModalVisible(false);
  };

  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
    console.log(selectedFilters);
  };


  const handleMarkerClick = (coordinates: LatLng) => {
    setSelectedCoordinates(coordinates);
    openMapModal();
  };

  const handleFilterClick = (filters: selections) => {
    //setSelectedFilters(filters);
    setSelectedFilters(filters);
    openFilterModal();
  };

  useEffect(() => {
    if (selectedCoordinates) {
      setLatitude(selectedCoordinates.latitude);
      setLongitude(selectedCoordinates.longitude);
    }
    console.log('tela post user', selectedFilters);
    setSelectedFilters(selectedFilters);
  }, [selectedCoordinates, selectedFilters]);

  const setDataAsync = async () => {
    const dataStorage = await AsyncStorage.getItem('userID')
    if (dataStorage) {
      const userData = JSON.parse(dataStorage);
      setUserID(userData)
      console.log(userData)
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
        filtros: [`${selectedFilters}`],
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
        <ScrollView style={style.container}
          contentContainerStyle={{ rowGap: 12 }}
          horizontal={false}
          showsVerticalScrollIndicator={false}
        >
          <Text style={style.textTop}>Nova postagem</Text>

          <View style={style.containerView}>
            <Text style={style.subText}>Fotos</Text>
            <View style={style.imagesAnimal}>
              <ImageUpload onImageSelected={handleImageSelected} />
              <ImageUpload onImageSelected={handleImageSelected} />
              <ImageUpload onImageSelected={handleImageSelected} />
            </View>
          </View>
          <View style={style.containerView}>
            <Text style={style.subText}>Nome do animal</Text>
            <Input
              placeholder=""
              value={animal}
              onChange={(value) => setAnimal(value)}
            />
          </View>
          <View style={style.containerView}>
            <Text style={style.subText}>Descrição</Text>
            <Input
              placeholder=""
              onChange={(value) => setDescricao(value)}
              value={descricao}
            />
          </View>
          <View style={style.containerView}>
            <Text style={style.subText}>Último local visto</Text>
            {selectedCoordinates ? (
              <MapView style={style.map} initialRegion={{ ...selectedCoordinates, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>
                <Marker coordinate={selectedCoordinates} title="Localização selecionada" />
              </MapView>
            ) : (
              <View>
                <TouchableOpacity style={style.btt} onPress={openMapModal}>
                  <Text style={style.txtBotao}>Selecione a última localização</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={style.containerView}>
            <Text style={style.subText}>Filtros</Text>
            {filterModalVisible ? //arrumar visualização
              (
                <View>
                  {Object.keys(selectedFilters).map((category) => (
                    <View key={category}>
                      <FlatList
                        data={selectedFilters[category]}
                        renderItem={({ item }) => (
                          <TouchableOpacity key={item} >
                            <Select selector={item} />
                          </TouchableOpacity>
                        )}
                        numColumns={3}
                      />
                    </View>
                  ))}
                </View>
              )
              :
              (
                <View>
                  <TouchableOpacity style={style.btt} onPress={openFilterModal}>
                    <Text style={style.txtBotao}>Selecione as palavras chaves</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
          <View style={style.containerView}>
            <Button
              onPress={() => publicPost()}
              colorBorder={Colors.primaryColor}
              colorButton={Colors.primaryColor}
              colorText={Colors.whiteColor}
              title="Publicar"
            />
          </View>
        </ScrollView>
      </View>
      <MapModal visible={mapModalVisible} onClose={closeMapModal} onMarkerClick={handleMarkerClick} />
      <FilterModal visible={filterModalVisible} onClose={closeFilterModal} onFilter={handleFilterClick} />
    </Container>
  );
};
export default Post;