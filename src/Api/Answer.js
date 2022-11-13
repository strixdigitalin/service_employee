import {getUserDetail} from './Localstorage';

export const AddAnswer = async (payload, successCallBack) => {
  var myHeaders = new Headers();
  const user = await getUserDetail();
  myHeaders.append('Authorization', 'Bearer ' + user.bearer);

  var formdata = new FormData();

  formdata.append('token', user.user_token);
  formdata.append('question_id', payload.id);
  formdata.append('answer', payload.answer);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  fetch('https://strix-qa-client.herokuapp.com/api/addAnswer', requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(result);
      successCallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};

export const getAnswersOfAQuestion = async (id, successCallBack) => {
  const user = await getUserDetail();

  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + user.bearer);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(
    'https://strix-qa-client.herokuapp.com/api/QADetails?token=' +
      user.user_token +
      '&question_id=' +
      id,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => successCallBack(JSON.parse(result)))
    .catch(error => console.log('error', error));
};

export const getDashboardQuery = async callBack => {
  var myHeaders = new Headers();
  const user = await getUserDetail();

  myHeaders.append('Authorization', 'Bearer ' + user.bearer);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(
    'https://strix-qa-client.herokuapp.com/api/getcount?token=' +
      user.user_token,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      callBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};
