import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { LatLng, Marker } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import { IFilters, IPost } from '../../types/IPost';
import { IUser } from '../../types/IUser';
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

const Post = () => {
  const [descricao, setDescricao] = useState<string>('');
  const [animal, setAnimal] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [userData, setUserData] = useState<IUser>();
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState<LatLng | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] } | null>(null);
  const [resetImages, setResetImages] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const getDataFromStorage = async (key: string) => {
          try {
            const jsonValue = await AsyncStorage.getItem(key);
            if (jsonValue !== null) {
              const data = JSON.parse(jsonValue);
              console.log('Dados recuperados do AsyncStorage:', data);
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

        const retrievedData = await getDataFromStorage('userData');
        setUserData(retrievedData)

        if (selectedCoordinates) {
          setLatitude(selectedCoordinates.latitude);
          setLongitude(selectedCoordinates.longitude);
        }

        if (selectedFilters) {
          setSelectedFilters(null)
        }

      } catch (error) {
        console.error('Erro ao recuperar dados do Async', error);
      }
    }
    loadData()
  }, [selectedCoordinates]);

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

  const handleFilterClick = (filters: IFilters) => {
    setSelectedFilters({
      Tipo: filters.Tipo,
      Porte: filters.Porte,
      Pelo: filters.Pelo,
      Cor: filters.Cor,
      FaseVida: filters.FaseVida,
      Sexo: filters.Sexo
    });
    openFilterModal();
  };

  const resetFields = () => {
    setDescricao('');
    setAnimal('');
    setImages([]); // Limpa as imagens
    setLatitude(0);
    setLongitude(0);
    setSelectedCoordinates(null);
    setSelectedFilters({})

    setResetImages(true);
    setTimeout(() => {
      setResetImages(false);
    }, 1000);
  };

  const handleImageSelected = (imageUri: string) => {
    // Adiciona a URI da imagem ao estado images
    if (images.length == 3) {
      images.pop();
      setImages(prevImages => [...prevImages, imageUri]);
    } else {
      setImages(prevImages => [...prevImages, imageUri]);
    }
  };

  const publicPost = async () => {
    if (!animal || !descricao || images.length === 0 || latitude === 0 || longitude === 0 || !selectedFilters) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Atenção!',
        textBody: 'Por favor, preencha todos os campos da publicação.',
        autoClose: 2500
      })
      return;
    }
    const filtrosValues = Object.fromEntries(
      Object.entries(selectedFilters).map(([key, value]) => [key, value || []])
    );
    try {
      setLoading(true);
      const data: IPost = {
        nomePet: animal,
        descricao: descricao,
        imagens: images,
        isPublic: true,
        localizacao: [`${latitude}`, `${longitude}`],
        filtros: filtrosValues,
        userId: userData?.id,
      };
      console.log(data);
      const response = await PostList.postData(data);
      console.log('Resposta da solicitação:', response);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Sucesso!',
        textBody: 'Publicação enviada!',
        autoClose: 2000
      })
      resetFields();
      
    } catch (error) {
      resetFields();
      console.error('Erro ao publicar:', error);
    } finally {
      setLoading(false);
    }
  };

  const editFiltros = () => {
    setFilterModalVisible(true);
  };

  return (
    <Container backgroundColor={'#F8F9FA'}>
      <AlertNotificationRoot>
        <ScrollView style={style.container}
          contentContainerStyle={{ rowGap: 12, padding: 4, paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={style.containerView}>
            <Text style={style.subText}>Fotos</Text>
            <View style={style.imagesAnimal}>
              <ImageUpload onImageSelected={handleImageSelected} resetImages={resetImages} />
              <ImageUpload onImageSelected={handleImageSelected} resetImages={resetImages} />
              <ImageUpload onImageSelected={handleImageSelected} resetImages={resetImages} />
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
            <View style={style.viewEdit}>
              <Text style={style.subText}>Filtros</Text>
              {
                selectedFilters ?
                  <TouchableOpacity onPress={() => editFiltros()}>
                    <Text style={style.editText}>Editar</Text>
                  </TouchableOpacity>
                  : <></>
              }
            </View>
            {selectedFilters ?
              (
                <View style={style.viewFilters}>
                  {Object.keys(selectedFilters).map((category) => (
                    <View key={category}>
                      <FlatList
                        data={selectedFilters[category]}
                        renderItem={({ item }) => (
                          <Select selector={item} />
                        )}
                        keyExtractor={(item) => item.toString()}
                        scrollEnabled={false}
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
              onPress={publicPost}
              colorBorder={Colors.primaryColor}
              colorButton={Colors.primaryColor}
              colorText={Colors.whiteColor}
              title="Publicar"
              loading={loading}
            />
          </View>
        </ScrollView>
        <MapModal visible={mapModalVisible} onClose={closeMapModal} onMarkerClick={handleMarkerClick} />
        <FilterModal visible={filterModalVisible} onClose={closeFilterModal} onFilter={handleFilterClick} initialSelectedItems={selectedFilters} post={true} />
      </AlertNotificationRoot>
    </Container>
  );
};
export default Post;