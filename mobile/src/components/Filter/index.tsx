import { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Select from '../../components/Select';

import Colors from '../../global/style'
import style from './style'

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onFilter: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onFilter }) => {

  const [selectedItems, setSelectedItems] = useState<{ [key: string]: string | null }>({});

  const selections = {
    Tipo: ['Cachorro', 'Gato', 'Outro'],
    Porte: ['Grande', 'Médio', 'Pequeno'],
    Cor: ['Branco', 'Preto', 'Ruivo', 'Duas cores', 'Cinza', '+2 cores', 'Outra cor', 'Sem cor', 'Colorido'],
    FaseVida: ['Adulto', 'Jovem', 'Filhote'],
    Sexo: ['Macho', 'Fêmea', '']
  }

  const handleFilterPress = () => {
    onFilter(selectedItems);
    console.log('lalal ', selectedItems)
    onClose();
  };

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
  };


  return (
    <Modal visible={visible} animationType="slide">
      <View style={style.viewMain}>
        <View style={style.viewTop}>
          <Text style={style.textTop}>Filtros</Text>
          <Ionicons name="close" size={24} color={Colors.darkColor}
            onPress={handleFilterPress} />
        </View>
        <View style={{height:'84%'}}>
          {Object.keys(selections).map((category) => (
            <View key={category} style={{ gap: 10, paddingBottom: 2, paddingLeft: 8, paddingRight: 8 }}>
              {category == 'FaseVida' ? <Text>Fase da vida</Text> : <Text>{category}</Text>}
              <FlatList
                data={selections[category]}
                renderItem={({ item }) => (
                  <TouchableOpacity key={item} onPress={() => handleSelect(category, item)}
                    style={style.viewSelect}
                  >
                    <Select selector={item} selected={(selectedItems[category] || []).includes(item)} />
                  </TouchableOpacity>
                )}
                numColumns={3}
              />
            </View>
          ))}
        </View>
        <View style={style.viewBtts}>
            <TouchableOpacity
              onPress={() => {
                setSelectedItems({}); // Limpa todos os itens selecionados
              }}
            >
              <Text style={style.btt}>Limpar filtros</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFilterPress}>
              <Text style={style.btts}>Filtrar</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
export default FilterModal;