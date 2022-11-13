import AsyncStorage from '@react-native-community/async-storage';

export const BACKEND_URL = 'https://strix-qa-client.herokuapp.com/api';
export const USERDATA = 'userdata';
const stringIT = data => JSON.stringify(data);
export const saveInLocal = async (name, data) => {
  await AsyncStorage.setItem(name, stringIT(data));
};
export const getLocalData = async name => {
  const data = await AsyncStorage.getItem(name);
  return JSON.parse(data);
};

export const registerAnyUser = async (payload, successCallBack) => {
  var formdata = new FormData();
  const {name, email, password, mobile, user_type} = payload;
  formdata.append('name', name);
  formdata.append('email', email);
  formdata.append('password', password);
  formdata.append('mobile', mobile);
  formdata.append('user_type', user_type);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(BACKEND_URL + '/register', requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      successCallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};

export const loginUser = (payload, successCallBack) => {
  var formdata = new FormData();
  // formdata.append('employee_id', 123456);
  formdata.append('email', payload.email);
  formdata.append('password', payload.password);
  formdata.append('user_type', payload.user_type);
  formdata.append('employee_id', payload.employee_id);
  console.log(payload, '<<<this is payload data');

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch('https://strix-qa-client.herokuapp.com/api/login', requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      // saveInLocal(USERDATA, JSON.parse(result));
      successCallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};
