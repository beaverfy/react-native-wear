import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { sendMessageAsync, watchEvents } from 'react-native-wear-connectivity';
import type {
  ReplyCallback,
  ErrorCallback,
} from 'react-native-wear-connectivity';

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const unsubscribe = watchEvents.on('message', () => {
      setCount((prevCount) => prevCount + 1);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const onSuccess: ReplyCallback = (result) => console.log(result);
  const onError: ErrorCallback = (error) => console.log(error);
  const sendMessageToPhone = () => {
    const json = { text: 'hello' };
    sendMessageAsync(json).then(onSuccess).catch(onError);
  };

  return (
    <View style={styles.container}>
      <Text>count is: {count}</Text>
      <TouchableOpacity onPress={sendMessageToPhone} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    marginTop: 50,
    height: 50,
    width: 50,
    backgroundColor: 'red',
    borderRadius: 50,
  },
});
