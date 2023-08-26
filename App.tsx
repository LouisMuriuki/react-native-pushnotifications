/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {requestUserPermission} from './utils/notificationshelper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): JSX.Element {
  const [token, setToken] = useState('');
  useEffect(() => {
    requestUserPermission();
    getFcmToken();
  }, []);

  const getFcmToken = async () => {
    const token = await AsyncStorage.getItem('fcmToken');
    if (token) {
      setToken(token);
    }
  };

  return (
    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{alignItems: 'center', justifyContent: 'center'}}>
        Notifications
      </Text>
      <Text>{token}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
