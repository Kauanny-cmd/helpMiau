import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from '@rneui/base';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { StackTypes } from 'src/routes/authNavitagor';

import Container from '../../components/Container';
import Button from '../../components/Button';
import Input from '../../components/Input';

import Colors from '../../global/style';
import styles from './style';
import { supabase } from '../../utils/supabase';

const Login = () => {
  const navigation = useNavigation<StackTypes>();

  interface FormValues {
    name: string,
    email: string;
    password: string;
  }
  const registerUser = async (name: string, email: string, password: string) => {
    try {
      // Chame o método signUp para criar um novo usuário no Supabase
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      // Se ocorrer um erro durante a criação do usuário, trate-o
      if (error) {
        console.error('Erro ao criar usuário no Supabase:', error.message);
        throw new Error('Erro ao criar usuário.');
      }
  
      /* Se o usuário foi criado com sucesso, você pode atualizar os outros dados do usuário no seu banco de dados, por exemplo, nome.
      const { data, error: updateError } = await supabase.from('Usuarios').upsert([
        {
          nome: name,
          login: email,
          // Adicione outros campos conforme necessário
        },
      ]);*/
  
const { data} = await supabase
.from('Usuario')
.update({ nome: name, login: email })
.select()

      /* Se houver um erro durante a atualização dos dados do usuário, trate-o
      if (updateError) {
        console.error('Erro ao atualizar dados do usuário:', updateError.message);
        throw new Error('Erro ao criar usuário.');
      }*/
  
      // O usuário foi criado com sucesso
      console.log('Usuário criado com sucesso:', data);
  
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
      name:'',
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      name:Yup.string().required('Nome obrigatório'),
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
        <TouchableOpacity>
          <Button
            onPress={() => formik.handleSubmit()}
            colorBorder={Colors.primaryColor} colorButton={Colors.primaryColor} colorText={Colors.whiteColor} title='Cadastrar' />
        </TouchableOpacity>
        <Text style={styles.textPar} onPress={() => navigation.navigate('Login')}>Tem conta? Faça login</Text>
      </View>
    </Container>
  );
};

export default Login;