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
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {categoryOfId} from '../Api/Localstorage';
import {base_url, getAllQuestion} from '../Api/Questions';
import COLORS from '../constants/colors';

export default function QuestionDetail({route}) {
  console.log('\n\n\n', route.params, '\n\n<<props');
  const data = route.params.data.Question;
  const Answers = route.params.data.answers;
  console.log(Answers, '<<<answers');
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
        {/* <View style={style.inputContainer}>
          <Icon
            name="search"
            size={28}
            onPress={() => navigation.navigate('Signup')}
          />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Search for Question"
          />
        </View> */}
        {/* <Image source={{uri: `${base_url}/storage/app/${data.image_uri}`}} /> */}
        <Image
          style={{height: 200, objectFit: 'contain'}}
          source={{
            uri: `https://strix-qa-client.herokuapp.com/storage/app/public/question/image/Q2R7KqQdUUFss7qNx6y29KCViW0Hy1flyIiRjO6t.jpg`,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            // Alert.alert('hello');
            // navigation.navigate('Question Detail');
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
              <Text style={style.textStyle}>{data?.question}</Text>
            </View>
            <View style={style.card}>
              <Text style={style.textStyle2}></Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Text style={{...style.textStyle2, color: '#C0c'}}>
                  {categoryOfId(data.category_id)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              margin: 'auto',
              color: '#000000',
              padding: 10,
              backgroundColor: '#FFFFFFFF',
              borderRadius: 30,
            }}>
            All Answers
          </Text>
          <View style={{height: 10}} />
          {Answers.map((item, key) => {
            return (
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 5,
                  borderColor: '#ccc',
                  borderWidth: 0.8,
                }}>
                <View style={style.card}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{...style.textStyle, marginRight: 10}}>
                      {key + 1}
                    </Text>
                    <Text style={style.textStyle}>{item?.answer}</Text>
                  </View>
                </View>
                <View style={style.card}>
                  <Text style={style.textStyle2}></Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <Text style={{...style.textStyle2, color: '#C0c'}}>
                      Answered by: {item?.answered_by}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
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
