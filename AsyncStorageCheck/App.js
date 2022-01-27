import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [data, setData] = useState();

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('key', data);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const data = await AsyncStorage.getItem('key');
      if (data !== null) {
        setData(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('key');
    } catch (e) {
      console.log(e);
    } finally {
      setData('');
      console.log('Done.');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Async Storage check</Text>
      <TextInput style={styles.info} color="white" onChangeText={setData} />
      <View style={styles.buttons}>
        <View style={styles.text}>
          <Button title="Save data" color="#9AB242" onPress={storeData} />
        </View>
        <View style={styles.text}>
          <Button title="Remove data" color="#A4543F" onPress={removeValue} />
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.text}>{data}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    color: 'white',
    margin: 10,
    fontSize: 30,
  },
  info: {
    backgroundColor: '#1E0025',
    width: '80%',
    padding: 15,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    flexDirection: 'row',
  },
});

export default App;
