import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import { StackNavigation } from '../types/Routes';

import Login from '../screens/Login';
import Inicial from '../screens/Inicial';
import Cadastro from '../screens/Cadastro';
import Profile from '../screens/Profile';
import PostOne from '../screens/PostOne';

import TabNavigation from './tabNavigator';

import Colors from '../global/style'

const Stack = createStackNavigator();

export type StackTypes = StackNavigationProp<StackNavigation>

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.whiteColor,
      },
      headerTintColor: Colors.primaryColor,
    }}
      initialRouteName='Home'
    >
      <Stack.Screen name="Inicial" component={Inicial}
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen name="Login" component={Login}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="Cadastro" component={Cadastro}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="Home" component={TabNavigation}
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='PostOne' component={PostOne}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator >
  )
}