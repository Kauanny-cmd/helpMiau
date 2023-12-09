import { Image, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, TouchableOpacity, FlatList } from "react-native-gesture-handler";

import logoNome from '../../../assets/HelpMiAu.png'
import style from "./style";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Color from '../../global/style'

import { StackTypes } from "src/routes/authNavitagor";
import { IPost } from "src/types/IPost";

import PostList from "../../services/posts";

const Home = () => {
  const navigation = useNavigation<StackTypes>();
  const route = useRoute();
  //const { paramKey } = route.params;

  const [data, setData] = useState<IPost[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await PostList.getPost();
        setData(response);
        console.log("Dados: ", response);
      } catch (error) {
        console.error('Erro na tela Home:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <Container>
      <View style={style.topMain}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={logoNome} style={{ borderRadius: 100, width: 60, height: 60 }} />
        </TouchableOpacity>

        <Image source={logoNome} style={{ width: 160, height: 40 }} />
      </View>

      <View style={style.subTop}>
        <Input placeholder="Pesquisar" onChange={() => { console.log('asasas') }} value="" />
        <Button colorButton={Color.backgroundColor}
          colorText={Color.primaryColor}
          colorBorder={Color.backgroundColor}
          title={'iconFiltre'}
          onPress={() => navigation.navigate('Filter')}
        />
      </View>
      <ScrollView>
        <View style={style.cards}>
          <FlatList
            key={'_'}
            data={data}
            renderItem={({ item, index }) =>
              <TouchableOpacity onPress={() => navigation.navigate('PostOne', { id: item.id })}>
                <Card data={item} key={index}/>
              </TouchableOpacity>}
            numColumns={2}
          />
        </View>
      </ScrollView>
    </Container>
  )
}

export default Home;