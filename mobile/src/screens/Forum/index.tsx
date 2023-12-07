
import { View, Text } from 'react-native';
import { Image } from '@rneui/base';

import Container from '../../components/Container';

const Forum = () => {
  return (
    <Container backgroundColor={'#F8F9FA'}>
      <View >
        <Image source={require('../../../assets/focus.png')} style={{ width: 340, height: 280 }} />
        <Text >Help Miau</Text>
      </View>
    </Container>
  );
};
export default Forum;