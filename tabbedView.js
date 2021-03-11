import * as React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './settings';
import NewsFeed from './newsFeed';
import { useNavigation } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

function TabbedView(props) {
    debugger;
    const navigation = useNavigation()
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'feed') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'play-circle-outline' : 'play-circle-outline';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#2681f2',
                inactiveTintColor: 'gray',
            }}>
            <Tab.Screen name="feed" children={()=><NewsFeed navigation={navigation}/>} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
}

export default TabbedView;