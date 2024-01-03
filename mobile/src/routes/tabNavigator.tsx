import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../global/style';

import Home from '../screens/Home';
import Post from '../screens/Post';
//import Forum from '../screens/Forum';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused
              ? 'paw'
              : 'paw-outline';
          } else if (route.name === 'Post') {
            iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
          } else if (route.name === 'Forum') {
            iconName = focused ? 'chatbubbles-sharp' : 'chatbubbles-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: `${Colors.secondaryColor}`,
        tabBarInactiveTintColor: `${Colors.primaryColor}`,
        tabBarShowLabel:false,
        headerShadowVisible: false,
        headerTransparent: true,
      })}
    >
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Post" component={Post}/>
      {/* <Tab.Screen name="Forum" component={Forum} options={{
          headerTitle: '',
          headerTransparent: true,
        }}/> */}
    </Tab.Navigator>
  );
}
export default TabNavigation