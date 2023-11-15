import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from '@rneui/base';

import { StackTypes } from '../../routes/authNavitagor';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Colors from '../../global/style';
import styles from './style';

const Inicial = () => {
  const navigation = useNavigation<StackTypes>()
  return (
    <Container backgroundColor={'#F8F9FA'}>
      <View style={styles.foco}>
        <Image source={require('../../../assets/focus.png')} style={{ width: 340, height: 280 }} />
        <Text style={styles.textTitle}>Help Miau</Text>
        <Text style={styles.textPar}>
          Uma aplicação para o auxílio de busca e resgate de animais domésticos desaparecidos.
        </Text>
        <TouchableOpacity>
          <Button
            onPress={() => navigation.navigate('Login')}
            colorBorder={Colors.primaryColor} colorButton={Colors.primaryColor} colorText={Colors.whiteColor} title='Faça login' />
        </TouchableOpacity>
      </View>
    </Container>
  );
};
export default Inicial;