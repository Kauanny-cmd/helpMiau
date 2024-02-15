import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { EvilIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { supabase } from '../../utils/supabase';
import { StackTypes } from '../../routes/authNavitagor';
import { IUser } from '../../types/IUser';
import UserSign from '../../services/user';

import Container from '../../components/Container';
import Button from '../../components/Button';
import Input from '../../components/Input';

import Colors from '../../global/style';
import style from './style';

const Profile = () => {
  const navigation = useNavigation<StackTypes>();

  const [originalUserData, setOriginalUserData] = useState<IUser>();
  const [userData, setUserData] = useState<IUser>();
  const [profile, setProfile] = useState<boolean>();
  const [image, setImage] = useState<string>();

  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState<string>();

  useEffect(() => {
    const loadData = async () => {
      try {
        const getDataFromStorage = async (key: string) => {
          try {
            const jsonValue = await AsyncStorage.getItem(key);
            if (jsonValue !== null) {
              const data = JSON.parse(jsonValue);
              console.log('Dados recuperados do AsyncStorage:', data);
              return data;
            } else {
              console.log('Nenhum dado encontrado para a chave:', key);
              return null;
            }
          } catch (error) {
            console.error('Erro ao recuperar dados do AsyncStorage:', error);
            return null;
          }
        };

        const retrievedData = await getDataFromStorage('userData');
        console.log('Dados recuperados:', retrievedData);

        setUserData(retrievedData);
        setOriginalUserData(retrievedData); // Salvar dados originais

        if (userData?.avatarUrl) {
          setProfile(true)
          setImage(userData?.avatarUrl);
          console.log(image);
        }

        // Definir o estado de loading como false após obter os dados
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        // Definir o estado de loading como false em caso de erro
        setLoading(true);
      }
    };

    loadData();
  }, []);

  const handlePetsChange = (pets: string[]) => {
    setUserData({ ...userData, pets });
  };

  const editUser = async (userId: string, userData: IUser) => {
    try {
      const updatedUser = await UserSign.updateUser(userId, userData);
      console.log('Usuário atualizado:', updatedUser);
      console.log('Usuário atualizado:', userId, userData);
      setEditing(false);
    } catch (error) {
      console.error('Erro ao editar usuário:', error);
    }
  }

  const cancelEdit = () => {
    // Restaurar valores originais ao cancelar
    setUserData(originalUserData);
    setEditing(false);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    navigation.navigate('Inicial')
    console.log(error)
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
      // Atualiza o estado 'image' diretamente aqui durante a edição
      setImage(result.assets[0].uri);
      setUserData({ ...userData, avatarUrl: result.assets[0].uri });
      console.log(image)
    }
  };


  return (
    <Container backgroundColor={'#F8F9FA'}>
      <View style={style.container}>
        {
          loading ?
            <Image source={require("../../../assets/dogWalking.gif")} style={{ width: 130, height: 130, marginBottom: 100 }} />
            :
            <>
              <View style={style.card}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                >
                  <View style={style.main}>
                    {editing ? (
                      <View style={style.editSection}>
                        {profile ? (
                          <TouchableOpacity onPress={pickImage}>
                            <View style={style.profile}>
                              <Image source={{ uri: image }} style={style.profile} />
                            </View>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity onPress={pickImage}>
                            <View style={style.profile}>
                              {selectedImage ? (
                                <Image source={{ uri: selectedImage }} style={style.profile} />
                              ) : (
                                <Image source={require('../../../assets/noPerfil.png')} style={style.profile} />
                              )}
                            </View>
                          </TouchableOpacity>
                        )}
                        <EvilIcons name="pencil" size={22} color={Colors.whiteColor} style={style.iconEdit} />
                      </View>
                    ) : (
                      <TouchableOpacity onPress={pickImage}>
                        <View style={style.profile}>
                          {image ? (
                            <Image source={{ uri: image }} style={style.profile} />
                          ) : (
                            <Image source={require('../../../assets/noPerfil.png')} style={style.profile} />
                          )}
                        </View>
                      </TouchableOpacity>
                    )}
                    <View style={style.mainBasic}>
                      <View style={style.section}>
                        <Text style={style.label}>Nome</Text>
                        {editing ? (
                          <Input
                            placeholder='Nome'
                            value={userData?.nome}
                            onChange={(text) =>
                              setUserData({ ...userData, nome: text })}
                            height={40}
                          />
                        ) : (
                          <Text style={style.textLabel}>{userData?.nome ? userData.nome : 'Sem nome cadastrado'}</Text>
                        )}
                      </View>
                      <View style={style.section}>
                        <Text style={style.label}>Email</Text>
                        {editing ? (
                          <Input
                            placeholder='Email'
                            value={userData?.login}
                            editable={false}
                            height={40}
                          />
                        ) : (
                          <Text style={style.textLabel}>{userData?.login}</Text>
                        )}
                      </View>
                      <View style={style.section}>
                        <Text style={style.label}>Telefone</Text>
                        {editing ? (
                          <Input
                            placeholder='Telefone'
                            value={userData?.telefone}
                            onChange={(text) => {
                              const cleanedText = text.replace(/\D/g, '');
                              // Aplica a máscara (xx) x xxxx-xxxx
                              const maskedText = cleanedText.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
                              setUserData({ ...userData, telefone: maskedText })
                            }}
                            height={40}
                          />
                        ) : (
                          <Text style={style.textLabel}>{userData?.telefone ? userData.telefone : 'Sem telefone cadastrado'}</Text>
                        )}
                      </View>
                      <View style={style.section}>
                        <Text style={style.label}>Nome do(s) bichinhos(s)</Text>
                        {editing ? (
                          <Input
                            placeholder='Bichinhos'
                            value={userData?.pets.join(', ')}
                            onChange={(text) =>
                              handlePetsChange(text.split(', '))
                            }
                            height={40}
                          />
                        ) : (
                          <Text style={style.textLabel}>{userData?.pets.length ? userData.pets.join(', ') : 'Sem pets cadastrados'}</Text>
                        )}
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </View>
              <View style={style.viewFooter}>
                {
                  !editing
                    ?
                    <View style={style.button}>
                      <Button
                        onPress={() => setEditing(true)}
                        colorButton={Colors.primaryColor}
                        colorBorder={Colors.primaryColor}
                        colorText={Colors.whiteColor}
                        height={40}
                        elevation={2}
                        title='Editar dados'
                      />
                    </View>
                    :
                    <View style={style.button}>
                      <Button
                        onPress={() => editUser(userData.id, userData)}
                        colorButton={Colors.primaryColor}
                        colorBorder={Colors.primaryColor}
                        colorText={Colors.whiteColor}
                        height={40}
                        elevation={2}
                        title='Salvar' // Desativa o botão se não estiver editando
                      />
                    </View>
                }
                {
                  !editing
                    ?
                    <View style={style.button}>
                      <Button
                        onPress={() => logout()}
                        colorButton={Colors.backgroundColor}
                        colorBorder={Colors.textDangerColor}
                        colorText={Colors.dangerColor}
                        height={40}
                        elevation={2}
                        title='Sair'
                      />
                    </View>
                    :
                    <View style={style.button}>
                      <Button
                        onPress={cancelEdit}
                        colorButton={Colors.backgroundColor}
                        colorBorder={Colors.textDangerColor}
                        colorText={Colors.dangerColor}
                        height={40}
                        elevation={2}
                        title='Cancelar'
                      />
                    </View>
                }
              </View>
            </>
        }
      </View>
    </Container>
  );
};
export default Profile;