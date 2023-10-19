import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from './src/routes/authNavitagor';

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
      <StatusBar translucent/>
    </NavigationContainer>
  );
}