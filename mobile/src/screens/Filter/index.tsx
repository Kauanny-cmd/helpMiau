import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Container from '../../components/Container';
import Select from '../../components/Select';

import Colors from '../../global/style'
import style from './style'
import Button from '../../components/Button';
import { StackTypes } from '../../routes/authNavitagor';

const Filter = () => {
  const navigation = useNavigation<StackTypes>();

  const [selectedItems, setSelectedItems] = useState<{ [key: string]: string | null }>({});

  const selections = {
    Tipo: ['Cachorro', 'Gato', 'Outro'],
    Porte: ['Grande', 'Médio', 'Pequeno'],
    Cor: ['Branco', 'Preto', 'Ruivo', 'Duas cores', 'Cinza', '+2 cores', 'Outra cor', 'Sem cor', 'Colorido'],
    FaseVida: ['Adulto', 'Jovem', 'Filhote'],
    Sexo: ['Macho', 'Fêmea']
  }

  const handleSelect = (category: string, value: string) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedCategory = [...(prevSelectedItems[category] || [])];
      const index = updatedCategory.indexOf(value);
  
      if (index !== -1) {
        // Remove o valor se já estiver presente
        updatedCategory.splice(index, 1);
      } else {
        // Adiciona o valor se não estiver presente
        // Limpa os itens selecionados anteriores na mesma categoria
        updatedCategory.length = 0;
        updatedCategory.push(value);
      }
  
      return {
        ...prevSelectedItems,
        [category]: updatedCategory,
      };
    });
  };  

  const handleFilter = () => {
    // Faça o que precisar com os dados selecionados (armazenados em selectedItems)
    console.log('Dados selecionados:', selectedItems);
    navigation.goBack();
  };


  return (
    <Container backgroundColor={'#F8F9FA'}>
      <View style={{ height: '100%', width: '100%' }}>
        {Object.keys(selections).map((category) => (
          <View key={category}>
            {category == 'FaseVida' ? <Text>Fase da vida</Text> : <Text>{category}</Text>}
            <FlatList
              data={selections[category]}
              renderItem={({ item }) => (
                <TouchableOpacity key={item} onPress={() => handleSelect(category, item)}>
                  <Select selector={item} selected={(selectedItems[category] || []).includes(item)} />
                </TouchableOpacity>
              )}
              numColumns={3}
            />
          </View>
        ))}
        <View style={style.btts}>
          <Button
            onPress={() => {
              setSelectedItems({}); // Limpa todos os itens selecionados
            }}
            colorButton={Colors.primaryColor}
            colorBorder={Colors.primaryColor}
            colorText={Colors.whiteColor}
            title="Limpar filtro"
          />
          <Button
            onPress={handleFilter}
            colorButton={Colors.primaryColor}
            colorBorder={Colors.primaryColor}
            colorText={Colors.whiteColor}
            title="Filtrar"
          />
        </View>
      </View>
    </Container>
  );
};
export default Filter;