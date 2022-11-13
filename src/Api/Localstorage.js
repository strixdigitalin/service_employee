import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const USER_DATA = 'USER_DATA';

export const saveUserDetail = payload => {
  const stringPayload = JSON.stringify(payload);
  AsyncStorage.setItem(USER_DATA, stringPayload);
};
// export const getRole

export const getUserDetail = async () => {
  const user = await AsyncStorage.getItem(USER_DATA);
  return JSON.parse(user);
};

export const categoryOfId = id => {
  if (id == 1) return 'Marketing';
  if (id == 2) return 'Sales';
  if (id == 3) return 'Technical';
};
export const getCAtegoryID = async () => {
  const user = await getUserDetail();
  console.log(user, '\n\n\n\n\n<<<<Depart nament name');
  console.log('user at get category id ,\n\n', user);
  return 1;
  if (user.department_name == 'marketing') return {value: 'Marketing', id: 1};
  if (user.department_name == 'sales') return {value: 'Sales', id: 2};
  if (user.department_name == 'technical') return {value: 'Technical', id: 3};
};

export const getImageUrl = file => {
  // var axios = require('axios');
  var FormData = require('form-data');
  console.log('\n\n', file, '<<<\n\n');
  // var fs = require('fs');
  var data = new FormData();
  data.append('file', file);
  data.append('upload_preset', 'quinkpost');
  data.append('cloud_name', 'Quink-Post');

  var config = {
    method: 'post',
    url: 'https://api.cloudinary.com/v1_1/quink-post/image/upload',
    // headers: {
    //   // ...data.getHeaders(),
    // },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
