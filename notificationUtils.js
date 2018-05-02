import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';

const NOTIF_KEY = 'UdacCards:Notification';

const generateNotif = () => {
  return {
    body: 'Don\'t forget to learn new thing',
    title: 'Come back!',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
};

const clearNotifs = async () => {
  await AsyncStorage.removeItem(NOTIF_KEY);
  await Notifications.cancelAllScheduledNotificationsAsync();
};

const createNotif = async () => {
  const raw = await AsyncStorage.getItem(NOTIF_KEY);
  const parsed = JSON.parse(raw);
  if (!parsed) {
    Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
      if (status === 'granted') {
        Notifications.cancelAllScheduledNotificationsAsync();

        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(20);
        tomorrow.setMinutes(0);

        Notifications.scheduleLocalNotificationAsync(createNotification(), {
          time: tomorrow,
          repeat: 'day',
        });

        AsyncStorage.setItem(NOTIF_KEY, JSON.stringify(true));
      }
    });
  }
};

export {
  createNotif,
  clearNotifs,
};
