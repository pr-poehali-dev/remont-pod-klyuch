import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import ReportsScreen from './src/screens/ReportsScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{title: 'БухКонтроль'}}
        />
        <Stack.Screen 
          name="Tasks" 
          component={TasksScreen}
          options={{title: 'Задачи'}}
        />
        <Stack.Screen 
          name="Reports" 
          component={ReportsScreen}
          options={{title: 'Отчёты ФНС'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
