import {getCAtegoryID, getUserDetail} from './Localstorage';
export const base_url = 'https://strix-qa-client.herokuapp.com';

export const AddQuestions = async (payload, successCallBack) => {
  var myHeaders = new Headers();
  const user = await getUserDetail();
  console.log(
    payload.image_uri,
    '<<<image uri\n\n',
    payload.audio_uri,
    '\n<<<<audio\n\n',
    user,
  );

  myHeaders.append('Authorization', 'Bearer ' + user.bearer);
  myHeaders.append('Content-Type', 'multipart/form-data');

  var formdata = new FormData();
  formdata.append('token', user.user_token);
  formdata.append('question', payload.question);
  formdata.append('categorie_id', payload.category_id);
  formdata.append('image_uri', payload.image_uri, payload.image_uri.uri);
  formdata.append('audio_uri', payload.audio_uri);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  fetch('https://strix-qa-client.herokuapp.com/api/addQuestion', requestOptions)
    .then(response => response.text())
    .then(result => {
      successCallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
  return null;

  const userData = await getUserDetail();
  console.log(userData);
  var myHeaders = new Headers();
  console.log(payload, '<<<upload items');
  myHeaders.append('Authorization', 'Bearer ' + userData.bearer);

  var formdata = new FormData();
  formdata.append('token', userData.user_token);
  formdata.append('question', payload.question);
  formdata.append('image_uri', payload.image_uri);
  formdata.append('categorie_id', 1);
  formdata.append('audio_uri', payload.audio_uri);
  formdata.append('categorie_id', '1');
  // formdata.append(
  //   'image_uri',
  //   fileInput.files[0],
  //   '/C:/Users/hp/Downloads/Screenshot 2022-09-21 145422.png',
  // );
  // formdata.append(

  //   'audio_uri',
  //   fileInput.files[0],
  //   '/C:/Users/hp/Downloads/u345999420_nuchbee (2).pdf',
  // );

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
  };

  fetch('https://strix-qa-client.herokuapp.com/api/addQuestion', requestOptions)
    .then(response => response.text())
    .then(result => {
      successCallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};

export const getAllQuestion = async successCallBack => {
  // console.log(await getUserDetail(), '<<< user details');
  const user = await getUserDetail();
  var myHeaders = new Headers();

  myHeaders.append('Authorization', 'Bearer ' + user.bearer);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(
    'https://strix-qa-client.herokuapp.com/api/askedBy?token=Do3FkTZa6I23hWlKpv7Q07txEqqT5Se2Zl0qDTJ95mdr4B5M7l22G5jeeNOh',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      successCallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));

  return null;

  var myHeaders = new Headers();
  const userData = await getUserDetail();

  console.log('user data at await \n\n', userData, '\n\n');
  var myHeaders = new Headers();
  myHeaders.append('Authorization', 'Bearer ' + userData.bearer);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(
    'https://strix-qa-client.herokuapp.com/api/askedBy?token=' + userData.token,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      // console.log(result)
    })
    .catch(error => console.log('error', error));
};

export const getQuestionByCategory = async successCallBack => {
  const {id} = await getCAtegoryID();
  console.log(id, '<<< this is category id');
  var myHeaders = new Headers();
  const user = await getUserDetail();

  myHeaders.append('Authorization', 'Bearer ' + user.bearer);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(
    'https://strix-qa-client.herokuapp.com/api/byCategorie?token=' +
      user.user_token +
      '&categorie_id=' +
      1,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      console.log('\n\n\n\n Questions fetched');
      successCallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};
export const getQuestionByProvidedCategory = async (
  category,
  successCallBack,
) => {
  // const {id} = await getCAtegoryID();
  console.log(category, '<<< this is category id');
  var myHeaders = new Headers();
  const user = await getUserDetail();

  myHeaders.append('Authorization', 'Bearer ' + user.bearer);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(
    'https://strix-qa-client.herokuapp.com/api/byCategorie?token=' +
      user.user_token +
      '&categorie_id=' +
      category,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      console.log('\n\n\n\n Questions fetched');
      successCallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};

export const questionsAskedByUser = async successCallBack => {
  var myHeaders = new Headers();
  const user = await getUserDetail();

  myHeaders.append('Authorization', 'Bearer ' + user.bearer);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch(
    'https://strix-qa-client.herokuapp.com/api/askedBy?token=' +
      user.user_token,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      console.log(result, '<<<<this is result');
      successCallBack(JSON.parse(result));
    })
    .catch(error => console.log('error', error));
};
