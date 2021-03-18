import { AsyncStorage } from '@react-native-community/async-storage';

export const setItem = (key, obj) => {
   AsyncStorage.setItem(key, JSON.stringify(obj));
} 

export const  getItem = (key) => {
   return  AsyncStorage.getItem(key);
}