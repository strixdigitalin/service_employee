import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import commonStyle from '../theme/Style';
import {COLORS, SIZES} from '../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';
import {registerAnyUser} from '../Api/Authentication';
import {getUserDetail, saveUserDetail} from '../Api/Localstorage';
import {ScrollView} from 'react-native-gesture-handler';

export default function Signup({navigation}) {
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userType, setUserType] = useState();
  const [submitData, setSubmitData] = useState({
    name: '',
    email: '',
    mobile: '',
    employee_id: '',
    password: '',
    user_type: '',
  });
  const [isFocus, setIsFocus] = React.useState(false);
  const [isFocus2, setIsFocus2] = React.useState(false);
  const [selectedValue, setselectedValue] = useState(null);

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

  const submitSignup = () => {
    registerAnyUser(submitData, res => {
      // console.log(res.email, '<<<<74');
      if (res.email) return Alert.alert(res.email[0]);
      Alert.alert(res.message);
      saveUserDetail({...res.user, bearer: res['bearer-token']});
      console.log(getUserDetail());
    });
  };

  const changeFormData = (name, value) => {
    setSubmitData({...submitData, [name]: value});
  };

  return (
    <ScrollView style={{height: '100%'}}>
      <View style={{...styles.container}}>
        <View style={{height: '2%'}} />

        <View style={{alignItems: 'flex-start', width: '100%'}}>
          <Text style={{fontSize: 22, fontWeight: '500', color: '#000'}}>
            Add Employee
          </Text>
          {/* <Text style={{fontSize: 16, fontWeight: '400', color: '#333'}}>
            Hi there! Nice to see you.
          </Text> */}
        </View>

        <View style={{height: '2%'}} />

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '50%',
                borderWidth: 2,
                borderRadius: 10,
                borderColor: '#dcdcdc',
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Picker
                selectedValue={submitData.user_type}
                style={{height: 40, width: 150, borderWidth: 1}}
                onValueChange={(itemValue, itemIndex) =>
                  changeFormData('user_type', itemValue)
                }>
                <Picker.Item label="Role" value={null} />
                <Picker.Item label="User" value="user" />
                <Picker.Item label="Support" value="support" />
              </Picker>
            </View>
            {/* <View style={{height: 10}} /> */}

            <View
              style={{
                width: '50%',
                borderWidth: 2,
                borderRadius: 10,
                borderColor: '#dcdcdc',
                height: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Picker
                selectedValue={submitData.user_type}
                style={{height: 40, width: 150, borderWidth: 1}}
                onValueChange={(itemValue, itemIndex) =>
                  changeFormData('department_name', itemValue)
                }>
                <Picker.Item label="Field" value={null} />
                <Picker.Item label="Marketing" value="marketing" />
                <Picker.Item label="Sales" value="sales" />
                <Picker.Item label="Technical" value="technical" />
              </Picker>
            </View>
          </View>
          <View style={{height: 25}} />
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
                value={submitData.employee_id}
                onChangeText={text => {
                  changeFormData('employee_id', text);
                }}
                placeholder={isFocus2 ? '' : 'Employee Id'}
                placeholderTextColor="#222222"
                // keyboardType="numeric"
                style={{
                  height: 40,
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

          <View style={{height: 25}} />
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
                  height: 40,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                onPressIn={() => {
                  setIsFocus2(true);
                }}
              />
            </View>
          </View>

          <View style={{height: 25}} />
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
                  height: 40,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                onPressIn={() => {
                  setIsFocus2(true);
                }}
              />
            </View>
          </View>

          <View style={{height: 25}} />

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
              Email
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 10,
              }}>
              <TextInput
                value={submitData.email}
                onChangeText={text => {
                  setPhone(text);
                  changeFormData('email', text);
                }}
                placeholder={isFocus ? '' : 'Email Id'}
                placeholderTextColor="#222222"
                // keyboardType="numeric"
                style={{
                  height: 40,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                onPressIn={() => {
                  setIsFocus(true);
                }}
              />
            </View>
          </View>

          <View style={{height: 25}} />

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
              Password
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#999',
                borderRadius: 10,
              }}>
              <TextInput
                value={submitData.email}
                onChangeText={text => {
                  // setPhone(text);
                  changeFormData('password', text);
                }}
                placeholder={isFocus ? '' : 'Email Id'}
                placeholderTextColor="#222222"
                // keyboardType="numeric"
                style={{
                  height: 40,
                  fontSize: 14,
                  color: '#222222',
                  paddingHorizontal: 16,
                }}
                onPressIn={() => {
                  setIsFocus(true);
                }}
              />
            </View>
          </View>

          {/* <View style={{height: 25}} /> */}
          <Button
            style={{...styles.btn1, borderRadius: 15}}
            onPress={() => {
              submitSignup();
            }}
            title="Create"
            // color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>

        {/* <View style={{height: '10%'}} /> */}
        {/* <Button /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    height: '100%',
    width: '100%',
    // alignItems: 'center',
    paddingHorizontal: 20,
  },
  btn1: {
    borderRadius: 15,
    color: '#841584',
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
