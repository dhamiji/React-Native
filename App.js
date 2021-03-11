import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image } from 'react-native';
import SectionListBasics from './cat';
import LoginScreen from './login';
import TabbedView from './tabbedView';
import Home from './home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      >
        <Stack.Screen
          name="SectionListBasics"
          component={SectionListBasics}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home}
          options={{
            headerStyle: {
              elevation: 0,
              shadowOpacity: 0
            },
            headerLeft: null, headerTitle: props => <Image style={{ width: '40%', height: 50, alignContent: 'flex-start', flex: 1, marginLeft: -15 }} source={require('./images/header-logo.png')} />
          }} />
      </Stack.Navigator>
      {/* <SectionListBasics /> */}
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    marginBottom: 60
  },
});
