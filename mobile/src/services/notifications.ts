import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#2563eb',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  
  if (finalStatus !== 'granted') {
    alert('Разрешите уведомления для получения напоминаний о сдаче отчётов!');
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

export async function scheduleReportNotification(
  reportName: string,
  dueDate: Date,
  reminderDays: number = 3
) {
  const notificationDate = new Date(dueDate);
  notificationDate.setDate(notificationDate.getDate() - reminderDays);

  if (notificationDate < new Date()) {
    console.log('Notification date is in the past, skipping');
    return;
  }

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: '📊 Напоминание о сдаче отчёта',
      body: `Через ${reminderDays} дн. нужно сдать: ${reportName}`,
      data: { reportName, dueDate: dueDate.toISOString() },
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: {
      date: notificationDate,
    },
  });

  console.log(`Scheduled notification ${identifier} for ${notificationDate}`);
  return identifier;
}

export async function scheduleUrgentReportNotification(
  reportName: string,
  dueDate: Date
) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(9, 0, 0, 0);

  if (tomorrow >= dueDate) {
    return;
  }

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: '🚨 СРОЧНО! Отчёт через 1 день',
      body: `Завтра крайний срок: ${reportName}`,
      data: { reportName, dueDate: dueDate.toISOString(), urgent: true },
      sound: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
    },
    trigger: {
      date: tomorrow,
    },
  });

  console.log(`Scheduled urgent notification ${identifier} for ${tomorrow}`);
  return identifier;
}

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
  console.log('All notifications cancelled');
}

export async function getPendingNotifications() {
  const notifications = await Notifications.getAllScheduledNotificationsAsync();
  return notifications;
}
