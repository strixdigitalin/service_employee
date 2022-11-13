import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import commonStyle from '../theme/Style';
import {COLORS, SIZES} from '../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';
import {loginUser} from '../Api/Authentication';
import {getUserDetail, saveUserDetail} from '../Api/Localstorage';

export default function Login({navigation}) {
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginData, setLoginData] = useState({
    id: '',
    user_type: 'user',
    email: 'user101@gmail.com',
    employee_id: '',
    password: '123456',
  });
  const [isFocus, setIsFocus] = React.useState(false);
  const [isFocus2, setIsFocus2] = React.useState(false);
  useEffect(() => {
    // navigation.navigate('Questions asked by you');
  }, []);

  const renderPhoneLabel = () => {
    if (phone || isFocus) {
      return (
        <Text
          style={[
            styles.label,
            isFocus && {
              color: '#222222',
              backgroundColor: '#f5f5f5',
              marginLeft: -7,
            },
          ]}>
          Email Id
        </Text>
      );
    }
    return null;
  };

  const renderPhoneLabel2 = text => {
    if (password || isFocus2) {
      return (
        <Text
          style={[
            styles.label,
            isFocus && {
              color: '#222222',
              backgroundColor: '#f5f5f5',
              marginLeft: -7,
            },
          ]}>
          Password
        </Text>
      );
    }
    return null;
  };

  const submitLogin = async () => {
    // navigation.navigate('BottomTab', {screen: 'NewBillScreen'});
    // return null;

    // const data = await getUserDetail();
    loginUser(loginData, async res => {
      Alert.alert(res.message);
      console.log(res, '<<<this is reponse in user side');
      saveUserDetail({...res.user, bearer: res['bearer-token']});
      console.log(res.user.user_type);
      if (res.user.user_type == 'support') {
        console.log('Category Question');
        navigation.navigate('Category Question');
      }
      if (res.user.user_type == 'user') {
        console.log('user user');

        navigation.navigate('Questions asked by you');
      }
      if (res.user.user_type == 'admin') {
        console.log('user user');

        navigation.navigate('Admin Dashboard');
      }

      // console.log(data, '<<<get user detail');
    });
  };

  // const loginHandle = async () => {

  //   const dataLogin = {
  //     user_type: `agent`,
  //     email: `${phone}`,
  //     password: `${password}`,
  //   };

  //   console.log('userData', dataLogin);

  //   try {
  //     const result = await axios.post(
  //       `https://qr.drazs.com/api/public/api/login`,
  //       dataLogin,
  //     );

  //     if (result.data.user.user_token) {
  //       await AsyncStorage.setItem('loginToken', result.data.user.user_token);
  //       await AsyncStorage.setItem('QRUser', JSON.stringify(result.data.user));
  //       navigation.navigate('VerifyCode');
  //       console.log('login-success');
  //     } else {
  //       console.log('login-failed');
  //       Alert.alert('Wrong Input!');
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const changeFormData = (name, value) => {
    console.log(name, value);
    setLoginData({...loginData, [name]: value});
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsFocus(false);
      }}>
      <View style={{...styles.container}}>
        <View style={{height: '10%'}} />

        <View style={{alignItems: 'flex-start', width: '100%'}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '500',
              color: '#000',
              textAlign: 'center',
            }}>
            Login
          </Text>
          <View style={{height: '8%'}} />

          {/* <Text style={{fontSize: 16, fontWeight: '400', color: '#333'}}>
            Hi there! Nice to see you.
          </Text> */}
        </View>
        <View style={{borderWidth: 1, borderRadius: 10, width: '100%'}}>
          <Picker
            selectedValue={loginData.user_type}
            style={{height: 50, width: '100%'}}
            onValueChange={(itemValue, itemIndex) =>
              changeFormData('user_type', itemValue)
            }>
            <Picker.Item label="Select Type" value={null} />
            <Picker.Item label="User/Admin" value="user" />
            <Picker.Item label="Support" value="support" />
            {/* <Picker.Item label="Admin" value="user" /> */}
          </Picker>
        </View>

        {loginData.user_type != 'support' && (
          <>
            <View style={{height: 30}} />
            <View>
              <View style={{width: SIZES.width - 40}}>
                {/* {renderPhoneLabel2()} */}
                <Text
                  style={[
                    styles.label,
                    isFocus && {
                      color: '#222222',
                      backgroundColor: '#f5f5f5',
                      marginLeft: -7,
                    },
                  ]}>
                  Email
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#999',
                    borderRadius: 10,
                  }}>
                  <TextInput
                    value={loginData.email}
                    onChangeText={text => {
                      changeFormData('email', text);
                    }}
                    // placeholder={isFocus ? '' : 'Id'}
                    placeholderTextColor="#222222"
                    // keyboardType="numeric"
                    style={{
                      height: 46,
                      fontSize: 14,
                      color: '#222222',
                      paddingHorizontal: 16,
                    }}
                    // onPressIn={() => {
                    //   setIsFocus2(true);
                    // }}
                  />
                </View>
              </View>

              <View style={{height: 10}} />
              {/* <View style={{width: SIZES.width - 40}}>
            <Text
              style={[
                styles.label,
                isFocus && {
                  color: '#222222',
                  backgroundColor: '#f5f5f5',
                  marginLeft: -7,
                },
              ]}>
              Name
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 10,
              }}>
              <TextInput
                value={submitData.name}
                onChangeText={text => {
                  changeFormData('name', text);
                }}
                placeholder={isFocus2 ? '' : 'Name'}
                placeholderTextColor="#222222"
                // keyboardType="numeric"
                style={{
                  height: 46,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                onPressIn={() => {
                  setIsFocus2(true);
                }}
              />
            </View>
          </View> */}

              {/* <View style={{height: 30}} />
          <View style={{width: SIZES.width - 40}}>
      
            <Text
              style={[
                styles.label,
                isFocus && {
                  color: '#222222',
                  backgroundColor: '#f5f5f5',
                  marginLeft: -7,
                },
              ]}>
              Mob
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 10,
              }}>
              <TextInput
                value={submitData.mobile}
                onChangeText={text => {
                  setPassword(text);
                  changeFormData('mobile', text);
                }}
                placeholder={isFocus2 ? '' : 'Mob'}
                placeholderTextColor="#222222"
                // keyboardType="numeric"
                style={{
                  height: 46,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                onPressIn={() => {
                  setIsFocus2(true);
                }}
              />
            </View>
          </View> */}

              <View style={{height: 30}} />
            </View>
          </>
        )}
        {loginData.user_type == 'support' && (
          <>
            <View style={{height: 30}} />
            <View>
              <View style={{width: SIZES.width - 40}}>
                {/* {renderPhoneLabel2()} */}
                <Text
                  style={[
                    styles.label,
                    isFocus && {
                      color: '#222222',
                      backgroundColor: '#f5f5f5',
                      marginLeft: -7,
                    },
                  ]}>
                  Employee Id
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#999',
                    borderRadius: 10,
                  }}>
                  <TextInput
                    value={loginData.employee_id}
                    onChangeText={text => {
                      changeFormData('employee_id', text);
                    }}
                    // placeholder={isFocus ? '' : 'Id'}
                    placeholderTextColor="#222222"
                    // keyboardType="numeric"
                    style={{
                      height: 46,
                      fontSize: 14,
                      color: '#222222',
                      paddingHorizontal: 16,
                    }}
                    // onPressIn={() => {
                    //   setIsFocus2(true);
                    // }}
                  />
                </View>
              </View>

              <View style={{height: 10}} />
              {/* <View style={{width: SIZES.width - 40}}>
            <Text
              style={[
                styles.label,
                isFocus && {
                  color: '#222222',
                  backgroundColor: '#f5f5f5',
                  marginLeft: -7,
                },
              ]}>
              Name
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 10,
              }}>
              <TextInput
                value={submitData.name}
                onChangeText={text => {
                  changeFormData('name', text);
                }}
                placeholder={isFocus2 ? '' : 'Name'}
                placeholderTextColor="#222222"
                // keyboardType="numeric"
                style={{
                  height: 46,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                onPressIn={() => {
                  setIsFocus2(true);
                }}
              />
            </View>
          </View> */}

              {/* <View style={{height: 30}} />
          <View style={{width: SIZES.width - 40}}>
      
            <Text
              style={[
                styles.label,
                isFocus && {
                  color: '#222222',
                  backgroundColor: '#f5f5f5',
                  marginLeft: -7,
                },
              ]}>
              Mob
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 10,
              }}>
              <TextInput
                value={submitData.mobile}
                onChangeText={text => {
                  setPassword(text);
                  changeFormData('mobile', text);
                }}
                placeholder={isFocus2 ? '' : 'Mob'}
                placeholderTextColor="#222222"
                // keyboardType="numeric"
                style={{
                  height: 46,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                onPressIn={() => {
                  setIsFocus2(true);
                }}
              />
            </View>
          </View> */}

              <View style={{height: 30}} />
            </View>
          </>
        )}
        <View>
          <View style={{width: SIZES.width - 40}}>
            {/* {renderPhoneLabel2()} */}
            <Text
              style={[
                styles.label,
                isFocus && {
                  color: '#222222',
                  backgroundColor: '#f5f5f5',
                  marginLeft: -7,
                },
              ]}>
              Password
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 10,
              }}>
              <TextInput
                value={loginData.password}
                onChangeText={text => {
                  changeFormData('password', text);
                }}
                // placeholder={isFocus ? '' : 'Id'}
                placeholderTextColor="#222222"
                // keyboardType="numeric"
                style={{
                  height: 46,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                // onPressIn={() => {
                //   setIsFocus2(true);
                // }}
              />
            </View>
          </View>

          <View style={{height: 10}} />
          {/* <View style={{width: SIZES.width - 40}}>
            <Text
              style={[
                styles.label,
                isFocus && {
                  color: '#222222',
                  backgroundColor: '#f5f5f5',
                  marginLeft: -7,
                },
              ]}>
              Name
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 10,
              }}>
              <TextInput
                value={submitData.name}
                onChangeText={text => {
                  changeFormData('name', text);
                }}
                placeholder={isFocus2 ? '' : 'Name'}
                placeholderTextColor="#222222"
                // keyboardType="numeric"
                style={{
                  height: 46,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                onPressIn={() => {
                  setIsFocus2(true);
                }}
              />
            </View>
          </View> */}

          {/* <View style={{height: 30}} />
          <View style={{width: SIZES.width - 40}}>
      
            <Text
              style={[
                styles.label,
                isFocus && {
                  color: '#222222',
                  backgroundColor: '#f5f5f5',
                  marginLeft: -7,
                },
              ]}>
              Mob
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 10,
              }}>
              <TextInput
                value={submitData.mobile}
                onChangeText={text => {
                  setPassword(text);
                  changeFormData('mobile', text);
                }}
                placeholder={isFocus2 ? '' : 'Mob'}
                placeholderTextColor="#222222"
                // keyboardType="numeric"
                style={{
                  height: 46,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                onPressIn={() => {
                  setIsFocus2(true);
                }}
              />
            </View>
          </View> */}

          <View style={{height: 30}} />
        </View>

        {/* <Picker
          selectedValue={loginData.user_type}
          style={{height: 50, width: 200}}
          onValueChange={(itemValue, itemIndex) =>
            changeFormData('user_type', itemValue)
          }>
          <Picker.Item label="Select Type" value={null} />
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Support" value="support" />
        </Picker> */}

        {/* <View style={{height: '10%'}} /> */}
        <View style={{height: 30}} />

        <TouchableOpacity
          style={{...commonStyle.submitBtn, ...commonStyle.rowSpaceBetween2}}
          onPress={() => {
            submitLogin();

            // navigation.navigate('BottomTab', {screen: 'NewBillScreen'});
          }}>
          <AntDesign name="arrowright" size={18} color={COLORS.primary} />
          <Text style={{fontSize: 16, fontWeight: '500', color: '#fff'}}>
            Login
          </Text>
          <AntDesign name="arrowright" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    height: '100%',
    width: '100%',
    // alignItems: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  countryCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    width: SIZES.width - 120,
    height: 50,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 9,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#f5f5f5',
    left: 22,
    top: -11,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
});
