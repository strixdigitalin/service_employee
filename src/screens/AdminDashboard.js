import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
  Button,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getAnswersOfAQuestion, getDashboardQuery} from '../Api/Answer';
import {categoryOfId} from '../Api/Localstorage';
import {base_url, getAllQuestion} from '../Api/Questions';
import ShowLoader from '../Component/ShowLoader';
import COLORS from '../constants/colors';

export default function AdminDashboard({navigation}) {
  const isfocused = useIsFocused();
  const Card = navigation => {
    console.log('\n\nnavigation', navigation, '<<');
    return (
      <View
        onPress={() => {
          Alert.alert('clickeds');
          navigation.navigate('Signup');
        }}
        style={{
          marginVertical: 10,
          marginHorizontal: 5,
          borderColor: '#ccc',
          borderWidth: 0.8,
        }}>
        <View style={style.card}>
          <Text style={style.textStyle}>Uploading 1 st question</Text>
        </View>
        <View style={style.card}>
          <Text style={style.textStyle2}></Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text style={{...style.textStyle2, color: '#C0c'}}>Marketing</Text>
          </View>
        </View>
      </View>
    );
  };
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getDashboardQuery(res => {
      setLoading(false);

      setDashboardData(res.data);
    });
  }, [isfocused]);

  return (
    <View style={style.container}>
      <Text style={style.textstyle1}>Overview</Text>
      {loading && <ShowLoader />}
      {dashboardData.map(item => {
        const data = item[0];
        return (
          <TouchableOpacity
            style={style.singleCard}
            onPress={() => {
              Alert.alert('pressed');
              navigation.navigate('All Question', {category: data.Category_id});
            }}>
            {/* <View
  //   style={style.singleCard}
  onPress={() => {
    Alert.alert('pressed');
    navigation.navigate('All Question', {category: 1});
  }}> */}
            <Text style={style.textstyle2}>
              {categoryOfId(data.Category_id)}
            </Text>
            <View>
              <View style={style.singlerow}>
                <View style={{width: '100%'}}>
                  <Text style={style.textstyle3}>Total Questions</Text>
                </View>
                <View>
                  <Text style={{...style.textstyle3, color: '#000'}}>
                    {data.total_questiom}
                  </Text>
                </View>
              </View>
              <View style={style.singlerow}>
                <View style={{width: '100%'}}>
                  <Text style={style.textstyle3}>Pending Answer</Text>
                </View>
                <View>
                  <Text style={{...style.textstyle3, color: '#ff0000'}}>
                    {+data.total_questiom - +data.total_answered_question}
                  </Text>
                </View>
              </View>
            </View>
            {/* </View> */}
          </TouchableOpacity>
        );
      })}

      <View style={style.adminfeature}>
        <View>
          <Button
            style={{...style.btn1, borderRadius: 15}}
            onPress={() => {
              navigation.navigate('Signup');
            }}
            title="Create Employee"
            // color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textstyle2: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  singleCard: {
    width: '100%',
    height: 100,
    margin: 'auto',
    padding: 10,
    paddingHorizontal: 20,
    // borderWidth: 1,
    backgroundColor: '#fff',
    marginTop: 15,
    borderRadius: 15,
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 10,
  },
  textstyle3: {
    color: '#000',
  },
  singlerow: {
    flexDirection: 'row',
    // width: '%',
    width: '50%',
    // borderWidth: 1,

    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  textstyle1: {
    fontSize: 25,

    // backgroundColor: 'none',
    color: '#000',
    // fontWeight: '400',
  },
  adminfeature: {
    marginTop: 40,
  },
  btn1: {
    borderRadius: 15,
    color: '#841584',
  },
});
