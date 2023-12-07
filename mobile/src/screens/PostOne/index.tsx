import { View, Text } from 'react-native';
import { Image } from '@rneui/base';
//import { useRoute } from '@react-navigation/native';
import Container from '../../components/Container';

const PostOne = () => {
  /* const route = useRoute();
  const { paramKey } = route.params; */
  return (
    <Container backgroundColor={'#F8F9FA'}>
      <View >
        <Image source={require('../../../assets/focus.png')} style={{ width: 340, height: 280 }} />
        <Text >'sksksks</Text>
      </View>
    </Container>
  );
};
export default PostOne;