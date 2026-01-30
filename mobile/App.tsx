import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './src/services/notifications';

import LoginScreen from './src/screens/LoginScreen';
import DocumentScannerScreen from './src/screens/DocumentScannerScreen';
import TasksScreen from './src/screens/TasksScreen';
import TaxReportsScreen from './src/screens/TaxReportsScreen';
import AIChatScreen from './src/screens/AIChatScreen';
import { AuthContext } from './src/context/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help';

          if (route.name === 'Scanner') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Tasks') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Reports') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Scanner" 
        component={DocumentScannerScreen}
        options={{ title: 'Сканировать' }}
      />
      <Tab.Screen 
        name="Tasks" 
        component={TasksScreen}
        options={{ title: 'Задачи' }}
      />
      <Tab.Screen 
        name="Reports" 
        component={TaxReportsScreen}
        options={{ title: 'Отчёты ФНС' }}
      />
      <Tab.Screen 
        name="Chat" 
        component={AIChatScreen}
        options={{ title: 'AI-помощник' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  useEffect(() => {
    // Проверка сохранённого токена
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('access_token');
        setUserToken(token);
      } catch (e) {
        console.log('Failed to load token');
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  useEffect(() => {
    // Регистрация push-уведомлений
    registerForPushNotificationsAsync();

    // Обработчик уведомлений при открытии приложения
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    // Обработчик нажатия на уведомление
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification clicked:', response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (token: string) => {
        await SecureStore.setItemAsync('access_token', token);
        setUserToken(token);
      },
      signOut: async () => {
        await SecureStore.deleteItemAsync('access_token');
        setUserToken(null);
      },
      token: userToken,
    }),
    [userToken]
  );

  if (isLoading) {
    return null; // Можно добавить splash screen
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {userToken == null ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <Stack.Screen name="Main" component={MainTabs} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}