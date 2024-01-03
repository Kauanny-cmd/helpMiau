import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from '@rneui/base';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { StackTypes } from 'src/routes/authNavitagor';
import { supabase } from '../../utils/supabase';
import UserSign from '../../services/user';

import Container from '../../components/Container';
import Button from '../../components/Button';
import Input from '../../components/Input';

import Colors from '../../global/style';
import styles from './style';

const Cadastro = () => {
  const navigation = useNavigation<StackTypes>();

  interface FormValues {
    name: string,
    email: string;
    password: string;
  }

  const registerUser = async (name: string, email: string, password: string) => {
    try {
      await AsyncStorage.clear()
      // Chama o método signUp para criar um novo usuário no Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      // Se ocorrer um erro durante a criação do usuário, trate-o
      if (error) {
        console.error('Erro ao criar usuário no Supabase:', error.message);
        throw new Error('Erro ao criar usuário.');
      }
      // Se o usuário foi criado com sucesso, você pode atualizar os outros dados do usuário no seu banco de dados, por exemplo, nome.
      const userData = await supabase
        .from('Usuario')
        .update({ nome: name, login: email })
        .select();
      // Chame a função postUser para enviar os dados para a API
      const apiResponse = await UserSign.postUser(name, email, password);

      // O usuário foi criado com sucesso
      await AsyncStorage.setItem('userEmail', JSON.stringify(apiResponse.user.login));
      await AsyncStorage.setItem('userID', JSON.stringify(apiResponse.user.id));

      // Retorne o usuário criado, se necessário
      return data;
    } catch (error) {
      // Trate outros erros, se necessário
      console.error('Erro geral:', error);
      throw new Error('Erro ao criar usuário.');  
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      email: Yup.string().email('Email inválido').required('O email é obrigatório'),
      password: Yup.string().required('A senha é obrigatória').min(6).required('A senha deve ter pelo menos 6 caracteres'),
    }),
    onSubmit: async (values) => {
      try {
        await registerUser(values.name, values.email, values.password);

        // Navegar para a próxima tela ou realizar outras ações necessárias após o cadastro bem-sucedido.
        navigation.navigate('Login');
      } catch (error) {
        // Aqui você pode lidar com erros da API, exibindo uma mensagem de erro para o usuário.
        console.error('Erro ao cadastrar usuário:', error);
      }
    },
  });

  return (
    <Container backgroundColor={'#F8F9FA'}>
      <Image source={require('../../../assets/icon.png')} style={styles.imageIcon} />
      <View style={styles.foco}>
        <Input
          placeholder="Nome"
          value={formik.values.name}
          onChange={formik.handleChange('name')}
          password={false}
        />
        <Input
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange('email')}
          password={false}
        />
        {formik.touched.email && formik.errors.email && <Text style={styles.errorText}>{formik.errors.email}</Text>}
        <Input
          placeholder="Senha"
          value={formik.values.password}
          onChange={formik.handleChange('password')}
          password={true}
        />
        {formik.touched.password && formik.errors.password && <Text style={styles.errorText}>{formik.errors.password}</Text>}
        <TouchableOpacity style={{marginTop:22}}>
          <Button
            onPress={() => formik.handleSubmit()}
            colorBorder={Colors.primaryColor} colorButton={Colors.primaryColor} colorText={Colors.whiteColor} title='Cadastrar' />
        </TouchableOpacity>
        <Text style={styles.textPar} onPress={() => navigation.navigate('Login')}>Tem conta? Faça login</Text>
      </View>
    </Container>
  );
};

export default Cadastro;