import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { EvilIcons } from '@expo/vector-icons'; 

import Colors  from "../../global/style"

import style from './style'

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
    <View style={style.container}>
      <TouchableOpacity onPress={pickImage}>
        <View style={style.imagePicker}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={style.imagePreview}/>
          ) : (
            <EvilIcons name="camera" size={34} color={Colors.primaryColor} />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImageUpload;
