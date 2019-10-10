import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
}

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if(value !== null){
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
}

const remData = async (key) => {
  try{
    AsyncStorage.removeItem(key)
  } catch(e){
    // Error retrieving data
  }
}

const getMultiple = async(keys) => {
    let data = {};

    for(let i = 0; i < keys.length; i++){
      let val = await AsyncStorage.getItem(keys[i]);
      data[keys[i]] = val;
    }

    return data;
}

export {
  storeData,
  getData,
  remData,
  getMultiple
}