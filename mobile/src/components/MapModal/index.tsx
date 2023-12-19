import React, { useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';
import MapView, { Marker, LatLng } from 'react-native-maps';

interface MapModalProps {
  visible: boolean;
  onClose: () => void;
}
const MapModal: React.FC<MapModalProps> = ({ visible, onClose, onMarkerClick }) => {
  const [markerCoordinates, setMarkerCoordinates] = useState<LatLng | null>(null);

  const handleMapPress = (event: any) => {
    // Extrai as coordenadas da ação
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinates(coordinate);

    // Chama a função para notificar o componente pai
    onMarkerClick(coordinate);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View>
        <Text>Map Modal</Text>
        <MapView
          style={{ height: 200 }}
          onPress={handleMapPress}
        >
          {markerCoordinates && (
            <Marker coordinate={markerCoordinates} title="Selected Location" />
          )}
        </MapView>
        <Button title="Close Map" onPress={onClose} />
      </View>
    </Modal>
  );
};

export default MapModal;