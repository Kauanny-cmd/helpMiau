import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import { Image } from '@rneui/base';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { StackTypes } from '../../routes/authNavitagor';
import { supabase } from '../../utils/supabase';
import UserSign from '../../services/user';

import Container from '../../components/Container';
import Button from '../../components/Button';
import Input from '../../components/Input';

import Colors from '../../global/style';
import styles from './style';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigation = useNavigation<StackTypes>();

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('O email é obrigatório').matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.com$/,
        'Email válido no formato "email@email.com"'
      ),
      password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória')
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const lowerCaseEmail = values.email.toLowerCase();
        const { data, error } = await supabase.auth.signInWithPassword({
          email: lowerCaseEmail,
          password: values.password,
        });
        if (error) {
          setError(error.message);
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Atenção!',
            textBody: 'Email e/ou senha estão inválidos.',
            autoClose: 1000
          })
        } else {
          // Limpa storage
          await AsyncStorage.clear()
          //set de valores
          const userData = await UserSign.getUser(data.user?.email);
          const dadosUser = {
            id: userData.id,
            nome: userData.nome,
            login: userData.login,
            avatarUrl: userData.avatarUrl,
            telefone: userData.telefone,
            pets: userData.pets
          };
          // salva dados no async do aparelho
          const jsonValue = JSON.stringify(dadosUser);
          await AsyncStorage.setItem('userData', jsonValue);
          // após salva dados, envia para a home
          navigation.navigate('Bichinhos');
        }
      } catch (e) {
        // Tratar outros erros, se necessário.
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Atenção!',
          textBody: 'Erro no servidor, por favor tente novamente mais tarde. Caso o erro persista, entre em contato com o suporte.',
          autoClose: 1500
        })
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <AlertNotificationRoot>
      <Container backgroundColor={'#F8F9FA'}>
        <Image source={require('../../../assets/icon.png')} style={styles.imageIcon} />
        <View style={styles.foco}>
          <Input
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange('email')}
            password={false}
            borderColor={formik.errors.email ? Colors.dangerColor : Colors.primaryColor}
          />
          {formik.touched.email && formik.errors.email && <Text style={styles.errorText}>{formik.errors.email}</Text>}
          <Input
            placeholder="Senha"
            value={formik.values.password}
            onChange={formik.handleChange('password')}
            password={true}
            borderColor={formik.errors.password ? Colors.dangerColor : Colors.primaryColor}
          />
          {formik.touched.password && formik.errors.password && <Text style={styles.errorText}>{formik.errors.password}</Text>}
          <TouchableOpacity style={{ marginTop: 22 }}>
            <Button
              onPress={() => formik.handleSubmit()}
              colorBorder={Colors.primaryColor} colorButton={Colors.primaryColor} colorText={Colors.whiteColor} title='Entrar'
              loading={loading}
            />
          </TouchableOpacity>
          <Text style={styles.textPar} onPress={() => navigation.navigate('Cadastro')}>Não tem conta? Cadastre-se</Text>
        </View>
      </Container>
    </AlertNotificationRoot>
  );
};

export default Login;