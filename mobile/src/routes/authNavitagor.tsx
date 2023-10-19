import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import Login from '../screens/Login';
import Home from '../screens/Home';

import Colors from '../global/style'

const Stack = createStackNavigator();

type StackNavigation = {
  Home: undefined,
  Login: undefined,
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
    >
      <Stack.Screen name="Login" component={Login}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="Home" component={Home}
        options={{
          headerTitle: '',
          headerTransparent: true,
        }}
      />
    </Stack.Navigator >
  )
}