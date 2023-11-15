import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import Login from '../screens/Login';
import Inicial from '../screens/Inicial';
import Cadastro from '../screens/Cadastro';

import TabNavigation from './tabNavigator';

import Colors from '../global/style'

const Stack = createStackNavigator();

type StackNavigation = {
  Home: undefined,
  Login: undefined,
  Inicial: undefined,
  Cadastro: undefined,
}

export type StackTypes = StackNavigationProp<StackNavigation>

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.whiteColor,
      },
      headerTintColor: Colors.primaryColor,
      headerShown: false
    }}
    initialRouteName='Inicial'
    >
      <Stack.Screen name="Inicial" component={Inicial}
        options={{
          headerTitle: '',
          headerTransparent: true,
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
          headerTitle: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator >
  )
}