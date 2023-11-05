import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
// request for user permission 
export const requestUserPermission = async () => {
  const authStatus = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  console.log('A line 8 uthorizationStatus', authStatus);

  if (authStatus === 'granted') {
    getFcmToken();
  } else {
    requestUserPermission();
  }
};
// once granted store the token
const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      console.log(fcmToken);
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('25 Cannot get FCMToken', {error});
    }
  }
};

// the token can be used to send messages from FCM TESTERS

//listen to messages

export const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    //  navigation.navigate(remoteMessage.data.type);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
    // firebase notifications dont show in foreground hence use custom library
    messaging().onMessage(async remoteMessage=>{
      console.log("notification on fore ground state", remoteMessage)
      PushNotification.localNotification({
        //@ts-expect-error
         message: remoteMessage?.notification?.body,
         title: remoteMessage?.notification?.title,
         bigPictureUrl: remoteMessage?.notification?.android?.imageUrl,
         smallIcon: remoteMessage?.notification?.android?.imageUrl,
       });
    })
};
