import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getAllQuestion} from '../Api/Questions';
import COLORS from '../constants/colors';

export default function ExistingBills({navigation}) {
  // console.log(navigation, '<<props');
  const {width, height} = Dimensions.get('screen');
  const [allQuestion, setAllQuestion] = useState([]);
  useEffect(() => {
    getAllQuestion(res => {
      console.log('All Question\n\n', res);
      if (res.Status) setAllQuestion(res.data);
    });
  }, []);

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

  return (
    <>
      <ScrollView style={{padding: 10, marginBottom: 10}}>
        <View style={style.inputContainer}>
          <Icon
            name="search"
            size={28}
            // onPress={() => navigation.navigate('Signup')}
          />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Search for Question"
          />
        </View>
        {allQuestion.map((que, key) => {
          const item = que[0].Question;
          // const answer=que[0]
          return (
            <TouchableOpacity
              key={key}
              onPress={() => {
                Alert.alert('hello');
                navigation.navigate('Question Detail', {data: que[0]});
                // navigation.navigate('Upload Answer', {data: que[0]});
              }}>
              {/* // key={key} */}
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 5,
                  borderColor: '#ccc',
                  borderWidth: 0.8,
                }}>
                <View style={style.card}>
                  <Text style={style.textStyle}>{item.question}</Text>
                </View>
                <View style={style.card}>
                  <Text style={style.textStyle2}></Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <Text style={{...style.textStyle2, color: '#C0c'}}>
                      Marketing
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
        {/* <TouchableOpacity
          onPress={() => {
            Alert.alert('hello');
            navigation.navigate('Question Detail', item);
          }}>
          <View
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
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Text style={{...style.textStyle2, color: '#C0c'}}>
                  Marketing
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity> */}
        {/* {allQuestion.map((item, key) => (
          <TouchableOpacity
            key={key}
            onPress={() => {
              Alert.alert('clickeds');
              navigation.navigate('Question Detail');
            }}>
            <View
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <Text style={{...style.textStyle2, color: '#C0c'}}>
                    Marketing
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))} */}
      </ScrollView>
      {/* <View
        style={{
          backgroundColor: '#fff',
          borderColor: COLORS.themeColor,
          borderWidth: 1,
          alignSelf: 'center',
          position: 'absolute',
          top: height / 1.45,
          elevation: 20,
          padding: 10,
          borderRadius: 30,
        }}>
        <Icon name="add" color={COLORS.themeColor} size={28} />
      </View> */}
    </>
  );
}

const style = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 2,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  textStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'rgba(0,0,0,0.9)',
    // width: '90%'
  },
  textStyle2: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'rgba(0,0,0,0.75)',
  },
  categoriesListContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    // width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 6,
    // marginHorizontal: 5,
    // marginVertical: 10,
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
