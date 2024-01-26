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
  initialSelectedItems?: { [key: string]: string | null };
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onFilter, initialSelectedItems }) => {

  const [selectedItems, setSelectedItems] = useState<{ [key: string]: string | null }>(initialSelectedItems || {});
  const [editNumber, setEditNumber] = useState<number>(0)

  const selections = {
    Tipo: ['Cachorro', 'Gato', 'Outro'],
    Porte: ['Grande', 'Médio', 'Pequeno'],
    Pelo: ['Longo', 'Médio', 'Curto'],
    Cor: ['Branco', 'Preto', 'Ruivo', 'Duas cores', 'Cinza', '+2 cores', 'Outra cor', 'Sem cor', 'Colorido'],
    FaseVida: ['Adulto', 'Jovem', 'Filhote'],
    Sexo: ['Macho', 'Fêmea', '']
  }

  const handleFilterPress = () => {
    onFilter(selectedItems);
    onClose();
  };

  const closedModal = () => {
    setSelectedItems({})
    onClose();
  }

  const handleSelect = (category: string, value: string) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedCategory = [...(prevSelectedItems[category] || [])];
      const index = updatedCategory.indexOf(value);

      if (index !== -1) {
        setEditNumber(editNumber - 1)
        // Remove o valor se já estiver presente
        updatedCategory.splice(index, 1);
      } else {
        setEditNumber(editNumber + 1)
        // Adiciona o valor se não estiver presente
        // Limpa os itens selecionados anteriores na mesma categoria
        updatedCategory.length = 0;
        updatedCategory.push(value);
      }
      // Retorna o valor selecionado de acordo com a categoria
      return {
        ...prevSelectedItems,
        [category]: updatedCategory,
      };
    });
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={style.viewMain}>
        <View style={style.viewTop}>
          <Text style={style.textTop}>Filtros</Text>
          <Ionicons name="close" size={24} color={Colors.darkColor} onPress={closedModal} />
        </View>
        <View style={{ height: '84%' }}>
          {Object.keys(selections).map((category) => (
            <View key={category} style={{ gap: 12, paddingBottom: 2, paddingLeft: 8, paddingRight: 8 }}>
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
          {
            editNumber > 0 ?
              <TouchableOpacity onPress={handleFilterPress}>
                <Text style={style.btts}>Filtrar</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={handleFilterPress} disabled={true}>
                <Text style={{ ...style.btts, backgroundColor: Colors.grayTextColor4, color: Colors.whiteColor, borderColor: Colors.grayTextColor4 }}>Filtrar</Text>
              </TouchableOpacity>
          }
        </View>
      </View>
    </Modal>
  );
}

export default FilterModal;