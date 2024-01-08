import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from '@rneui/base';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { StackTypes } from 'src/routes/authNavitagor';
import { supabase } from '../../utils/supabase';

import Container from '../../components/Container';
import Button from '../../components/Button';
import Input from '../../components/Input';

import Colors from '../../global/style';
import styles from './style';

const Login = () => {
  const navigation = useNavigation<StackTypes>();

  const [error, setError] = useState<string>(''); // Adicionei o tipo string ao estado

  interface FormValues {
    email: string;
    password: string;
  }

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Email inválido').required('O email é obrigatório'),
      password: Yup.string().required('A senha é obrigatória'),
    }),
    onSubmit: async (values) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email, // Corrigido o acesso aos valores
          password: values.password,
        });

        if (error) {
          console.error('Erro de login:', error.message);
          setError(error.message);
        } else {
          //console.log('Login bem-sucedido:', data);
          navigation.navigate('Bichinhos');
        }
      } catch (e) {
        console.error('Erro ao processar login:', e);
        // Tratar outros erros, se necessário.
      }
    },
  });

  return (
    <Container backgroundColor={'#F8F9FA'}>
      <Image source={require('../../../assets/icon.png')} style={styles.imageIcon} />
      <View style={styles.foco}>
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
            colorBorder={Colors.primaryColor} colorButton={Colors.primaryColor} colorText={Colors.whiteColor} title='Entrar' />
        </TouchableOpacity>
        <Text style={styles.textPar} onPress={() => navigation.navigate('Cadastro')}>Não tem conta? Cadastre-se</Text>
      </View>
    </Container>
  );
};

export default Login;