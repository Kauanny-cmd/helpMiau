import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../global/style';

import Home from '../screens/Home';
import Post from '../screens/Post';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Overview') {
            iconName = focused
              ? 'paw'
              : 'paw-outline';
          } else if (route.name === 'Post') {
            iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: `${Colors.primaryColor}`,
        tabBarInactiveTintColor: `${Colors.grayText}`,
        //headerShadowVisible: false,
        //headerTransparent: true,
        //headerShown: true,
        headerTitleStyle: {
          fontSize: 16,
          color: Colors.darkColor,
          textAlign: 'center'
        },
      })}
    >
      <Tab.Screen name="Overview" component={Home}
        options={{
          headerTitle: 'Bichinhos',
          title: 'Bichinhos'
        }}
      />
      <Tab.Screen name="Post" component={Post}
        options={{
          headerTitle: 'Adicionar bichinhos',
          title: 'Adicionar bichinhos'
        }}
      />
      <Tab.Screen name='Profile' component={Profile}
        options={{
          headerTitle: 'Perfil',
          title: 'Perfil'
        }}
      />
    </Tab.Navigator>
  );
}
export default TabNavigation