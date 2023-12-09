import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Image } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { supabase } from '../../utils/supabase';
import { StackTypes } from '../../routes/authNavitagor';

import Container from '../../components/Container';
import Button from '../../components/Button';
import logoNome from '../../../assets/HelpMiAu.png'

import Colors from '../../global/style'
import style from './style'

const Profile = () => {
  const navigation = useNavigation<StackTypes>();

  const [email, setEmail] = useState()

  useEffect(() => {
    const setEmailStorage = async () => {
      const dataStorage = await AsyncStorage.getItem('userEmail')
      if (dataStorage) {
        const userData = JSON.parse(dataStorage);
        setEmail(userData)
      }
    }
    setEmailStorage();
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    navigation.navigate('Login')

    console.log(error)
  }

  return (
    <Container backgroundColor={'#F8F9FA'}>
      <View style={style.container}>
        <View style={style.topMain}>
          <Image source={logoNome} style={{ width: 160, height: 40 }} />
          <Text onPress={() => navigation.goBack()}>X</Text>
        </View>
        <ScrollView>
          <Image source={require('../../../assets/HelpMiAu.png')} style={{ width: 90, height: 90, borderRadius: 100 }} />

          <View style={style.main}>
            <View style={{ gap: 14 }}>
              <View>
                <Text style={style.label}>Nome</Text>
                <Text style={style.textLabel}>Help Miau</Text>
              </View>
              <View>
                <Text style={style.label}>Email</Text>
                <Text style={style.textLabel}>{email}</Text>
              </View>
              <View>
                <Text style={style.label}>Telefone</Text>
                <Text style={style.textLabel}>Help Miau</Text>
              </View>
              <View>
                <Text style={style.label}>Nome do(s) pet(s)</Text>
                <Text style={style.textLabel}>Help Miau</Text>
              </View>
            </View>
            <View>
              <Button
                colorButton={Colors.primaryColor}
                colorBorder={Colors.primaryColor}
                colorText={Colors.whiteColor}
                title='Editar dados'
              />
              <Button
                onPress={() => logout()}
                colorButton={Colors.textDangerColor}
                colorBorder={Colors.textDangerColor}
                colorText={Colors.dangerColor}
                title='Sair'
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};
export default Profile;