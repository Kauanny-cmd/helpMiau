import { ActivityIndicator, Image, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';

import { StackTypes } from "src/routes/authNavitagor";
import { IFilters, IPost } from "src/types/IPost";
import PostList from "../../services/posts";

import Card from "../../components/Card";
import Container from "../../components/Container";
import Input from "../../components/Input";
import FilterModal from "../../components/Filter";

import logoNome from '../../../assets/HelpMiAu.png'
import semFoto from '../../../assets/noPerfil.png'

import Colors from '../../global/style'
import style from "./style";

const Home = () => {
  const navigation = useNavigation<StackTypes>();
  
  const [loading, setLoading] = useState(true); 
  const [data, setData] = useState<IPost[]>([]);
  const [profile, setProfile] = useState<boolean>();
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string | null }>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await PostList.getPost();
        setData(response);
        setProfile(false);
        setLoading(false);
      } catch (error) {
        console.error('Erro na tela Home:', error);
      }
    }
    const fetchInterval = setInterval(fetchData, 5000); // Atualiza a cada  segundos 
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
      <View style={style.topMain}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          {
            profile ? <Image source={logoNome} style={style.image} /> :
              <Image source={semFoto} style={style.image} />
          }
        </TouchableOpacity>
        <View style={style.imageLogo}>
          <Image source={logoNome} style={{ width: 128, height: 30 }} />
        </View>
      </View>
      <View style={style.subTop}>
        <View style={{ width: '80%' }}>
          <Input placeholder="Pesquisar"
            onChange={(value) => handleSearch(value)}
            value={searchTerm}
          />
        </View>
        <TouchableOpacity onPress={openFilterModal}>
          <Ionicons name="filter-outline" size={44} color={Colors.primaryColor} style={{ paddingRight: 2 }} />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
        {loading ? (
            <ActivityIndicator size="large" color={Colors.primaryColor} />
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
            />
          )}
        </View>
      </ScrollView>
      <FilterModal visible={filterModalVisible} onClose={closeFilterModal} onFilter={handleFilterClick} />
    </Container>
  )
}

export default Home;