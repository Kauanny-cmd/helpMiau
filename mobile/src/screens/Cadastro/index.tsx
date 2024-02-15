import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Toast, ALERT_TYPE, AlertNotificationRoot } from 'react-native-alert-notification';
import { useState } from 'react';
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

  const [loading, setLoading] = useState<boolean>(false);

  interface FormValues {
    name: string,
    email: string;
    password: string;
  }

  const registerUser = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      // Chama o método signUp para criar um novo usuário no Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      // Se ocorrer um erro durante a criação do usuário, trate-o
      if (error?.message == 'User already registered') {
        console.error('Erro ao criar usuário no Supabase:', error.message);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Atenção!',
          textBody: 'Email já cadastrado.',
          autoClose: 2000
        })
        throw new Error('Erro ao criar usuário.');
      }
      // Chame a função postUser para enviar os dados para a API
      await UserSign.postUser(name, email, password);

      // Retorne o usuário criado, se necessário
      return data;
    } catch (error) {
      // Trate outros erros, se necessário
      console.error('Erro geral:', error);
      throw new Error('Erro ao criar usuário.');
    } finally {
      setLoading(false);
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
      email: Yup.string().required('O email é obrigatório').matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.com$/,
        'Email válido no formato "email@email.com"'
      ),
      password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('A senha é obrigatória'),
    }),
    onSubmit: async (values) => {
      try {
        const lowerCaseEmail = values.email.toLowerCase();
        await registerUser(values.name, lowerCaseEmail, values.password);

        // Navegar para a próxima tela ou realizar outras ações necessárias após o cadastro bem-sucedido.
        // Após o cadastro bem-sucedido
        navigation.navigate('Login');
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Atenção!',
          textBody: 'Cadastro realizado com sucesso!',
          autoClose: 2000
        })

      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
      }
    },
  });

  return (
    <AlertNotificationRoot>
      <Container backgroundColor={'#F8F9FA'}>
        <Image source={require('../../../assets/icon.png')} style={styles.imageIcon} />
        <View style={styles.foco}>
          <Input
            placeholder="Nome"
            value={formik.values.name}
            onChange={formik.handleChange('name')}
            password={false}
            borderColor={formik.errors.email ? Colors.dangerColor : Colors.primaryColor}
          />
          {formik.touched.name && formik.errors.name && <Text style={styles.errorText}>{formik.errors.name}</Text>}
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
          {formik.errors.password && <Text style={styles.errorText}>{formik.errors.password}</Text>}
          <TouchableOpacity style={{ marginTop: 22 }}>
            <Button
              onPress={() => formik.handleSubmit()}
              colorBorder={Colors.primaryColor} colorButton={Colors.primaryColor} colorText={Colors.whiteColor} title='Cadastrar'
              loading={loading}
            />
          </TouchableOpacity>
          <Text style={styles.textPar} onPress={() => navigation.navigate('Login')}>Tem conta? Faça login</Text>
        </View>
      </Container>
    </AlertNotificationRoot>
  );
};

export default Cadastro;