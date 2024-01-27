import {ScrollView, Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';

import { StackTypes } from "src/routes/authNavitagor";
import { IFilters, IPost } from "src/types/IPost";
import PostList from "../../services/posts";

import Card from "../../components/Card";
import Container from "../../components/Container";
import Input from "../../components/Input";
import FilterModal from "../../components/Filter";

import Colors from '../../global/style'
import style from "./style";

const Home = () => {
  const navigation = useNavigation<StackTypes>();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IPost[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string | null }>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PostList.getPost();
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error('Erro na tela Home:', error);
      }
    };

    const fetchInterval = setInterval(fetchData, 60000); // Atualiza a cada 60 segundos 
    return () => {
      clearInterval(fetchInterval); // Limpa o intervalo ao desmontar o componente
    };
  }, []);

  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
    console.log(selectedFilters);
  };

  const handleFilterClick = (filters: IFilters) => {
    setSelectedFilters(filters);
    openFilterModal();
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // Função de busca nos nomes
  const filteredData = data.filter((item) => {
    // Filtro por termo de busca
    const searchTermMatch = item.nomePet.toLowerCase().includes(searchTerm.toLowerCase());
    // Filtro pelas seleções
    const filterMatch = Object.entries(selectedFilters).every(([key, values]) => {
      if (!values || values.length === 0) {
        return true; // Não aplicar filtro se nenhum valor estiver selecionado
      }
      // Verificar se a chave existe em 'filtros'
      if (key in item.filtros) {
        return values.some((filterValue) => item.filtros[key].includes(filterValue));
      }
      // Se a chave não existe em 'filtros', considerar como um não casamento
      return false;
    });
    return searchTermMatch && filterMatch;
  });

  return (
    <Container>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={style.textPar}>Veja a lista de bichinhos desaparecidos e busque pelo nome</Text>
        <View style={style.subTop}>
          <View style={{ width: '86%' }}>
            <Input placeholder="Pesquisar"
              onChange={(value) => handleSearch(value)}
              value={searchTerm}
              height={36}
              borderRadius={8}
            />
          </View>
          <TouchableOpacity onPress={openFilterModal}>
            <Ionicons name="filter-outline" size={28} color={Colors.primaryColor} style={{ paddingRight: 2 }} />
          </TouchableOpacity>
        </View>
        <View>
          {loading ? (
            <View style={{
              height: '82%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image source={require("../../../assets/dogWalking.gif")} style={{ width: 130, height: 130, marginTop: 30 }} />
            </View>
          ) : (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={filteredData}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => navigation.navigate('PostOne', { id: item.id })}>
                  <Card data={item} key={index} />
                </TouchableOpacity>
              )}
              numColumns={2}
             scrollEnabled={false}
            />
          )}
        </View>
        <FilterModal visible={filterModalVisible} onClose={closeFilterModal} onFilter={handleFilterClick} />
      </ScrollView>
    </Container>
  )
}

export default Home;