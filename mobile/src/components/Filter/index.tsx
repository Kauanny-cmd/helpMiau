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
  post?: boolean;
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onFilter, initialSelectedItems, post }) => {

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
      // Cria uma cópia do objeto de itens selecionados
      const updatedSelectedItems = { ...prevSelectedItems };
      // Verifica se a categoria já foi selecionada e se o valor já está presente nela
      if (updatedSelectedItems[category] && updatedSelectedItems[category].includes(value)) {
        // Remove o valor da categoria se já estiver presente
        updatedSelectedItems[category] = updatedSelectedItems[category].filter(item => item !== value);
      } else {
        // Adiciona o valor à categoria correspondente
        updatedSelectedItems[category] = [value];
      }
      // Atualiza o número de categorias preenchidas
      const editNumber = Object.keys(updatedSelectedItems).filter(key => updatedSelectedItems[key].length > 0).length;
      // Define o novo número de categorias preenchidas
      setEditNumber(editNumber);
      // Retorna o objeto de itens selecionados atualizado
      return updatedSelectedItems;
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
              setEditNumber(0);
            }}
          >
            <Text style={style.btt}>Limpar filtros</Text>
          </TouchableOpacity>
          {
            !post || editNumber == 6 ?
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