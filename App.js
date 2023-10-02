import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import MemoryScreen from './screens/Memory';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen 
          name='Home' 
          component={HomeScreen}
          options={({ route }) => ({ 
              title: route.params.user.email,
              headerLeft: () => null,
              headerRight: () => (
                  <Button 
                      onPress={() => alert('This is a button!')} 
                      title="Info"
                      color="#000"
                  />
              )
          })} 
        />
         <Stack.Screen name='Memory' component={MemoryScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
