import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImageUploadProps {
  onImageSelected: (uri: string) => void;
}

interface ImagePickerResult {
  cancelled: boolean;
  assets: Array<{
    uri: string;
  }>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>();

  const pickImage = async () => {
    // Permissões necessárias do dispositivo
    const result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
      onImageSelected(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Selecionar Imagem</Text>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.imagePicker}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.selectText}>Selecionar Imagem</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagePicker: {
    width: 200,
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  selectText: {
    color: '#888',
  },
});

export default ImageUpload;
