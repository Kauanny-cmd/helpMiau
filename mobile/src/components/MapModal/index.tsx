import React, { useEffect, useState } from 'react';
import { Alert, Linking, Modal, View } from 'react-native';
import MapView, { Marker, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import Button from '../Button';

import Colors from '../../global/style'
import style from './style';

interface MapModalProps {
  visible: boolean;
  onClose: () => void;
}

const MapModal: React.FC<MapModalProps> = ({ visible, onClose, onMarkerClick }) => {
  const [markerCoordinates, setMarkerCoordinates] = useState<LatLng | null>(null);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão Negada',
        'Para utilizar esta funcionalidade, por favor, conceda permissão de acesso à localização nas configurações do aplicativo.',
        [
          { text: 'Cancelar', onPress: () => onClose(), style: 'cancel' },
          { text: 'Configurações', onPress: () => Linking.openSettings() },
        ]
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        const location = await Location.getCurrentPositionAsync({});
        setMarkerCoordinates(location.coords);
      }
    };

    getLocation();
  }, []);

  const handleMapPress = (event: any) => {
    // Extrai as coordenadas da ação
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinates(coordinate);
    // Chama a função para notificar o componente pai
    onMarkerClick(coordinate);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={style.viewContainer}>
        <View style={style.arrowBtt}>
          <MaterialIcons name="arrow-back-ios" size={22} color={Colors.whiteColor} style={{ marginLeft: 8 }} onPress={onClose}/>
        </View>
        <MapView
          style={{ flex: 1 }}
          onPress={handleMapPress}
          region={{
            latitude: markerCoordinates?.latitude || 0,
            longitude: markerCoordinates?.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markerCoordinates && (
            <Marker
              coordinate={{
                latitude: markerCoordinates?.latitude || 0,
                longitude: markerCoordinates?.longitude || 0,
              }}
              title="Sua localização"
            />
          )}
        </MapView>
        <View style={style.buttonContainer}>
          {markerCoordinates ? (
            <Button
              title="OK"
              onPress={onClose}
              colorButton={Colors.secondaryColor}
              colorBorder={Colors.secondaryColor}
              colorText={Colors.whiteColor}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default MapModal;