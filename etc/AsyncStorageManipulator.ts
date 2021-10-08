import AsyncStorage from '@react-native-async-storage/async-storage';

export const dataToStore = async (key:string, value:any) => {
  if (value !== undefined) {
    try {
      await AsyncStorage.setItem(`${key}`, JSON.stringify(value));
    } catch (error) {
      // console.log(error);
    }
  }
};

export const retrieveData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    return null;
  }
};
