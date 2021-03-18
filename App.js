import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image } from 'react-native';
import Splash from './components/splash/splash';
import LoginScreen from './components/login/login';
import Register from './components/register/register';
import TabbedView from './components/tabs/tabbedView';
import Home from './components/tabs/home';
import header from './components/header'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import configureStore from './store';
const Stack = createStackNavigator();
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
        >
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home}
            options={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0
              },
              headerLeft: null, headerTitle: header }}/>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        </Stack.Navigator>
        {/* <SectionListBasics /> */}
      </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    marginBottom: 60
  },
});
