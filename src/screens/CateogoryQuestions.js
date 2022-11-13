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
import {categoryOfId, getCAtegoryID} from '../Api/Localstorage';
import {getAllQuestion, getQuestionByCategory} from '../Api/Questions';
import ShowLoader from '../Component/ShowLoader';
import COLORS from '../constants/colors';

export default function CategoryQuestion({navigation}) {
  // console.log(navigation, '<<props');
  const {value} = getCAtegoryID();
  const {width, height} = Dimensions.get('screen');
  const [loading, setLoading] = useState(false);
  const [allQuestion, setAllQuestion] = useState([]);
  useEffect(() => {
    // getAllQuestion(res => {
    setLoading(true);
    getQuestionByCategory(res => {
      setLoading(false);
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
            <Text style={{...style.textStyle2, color: '#C0c'}}>{value}</Text>
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
        {loading && <ShowLoader />}
        {allQuestion.map((que, key) => {
          const item = que[0].Question;
          // const answer=que[0]
          return (
            <TouchableOpacity key={key}>
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
                      width: '100%',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text
                        style={{...style.textStyle2, color: '#808080'}}
                        onPress={() => {
                          // Alert.alert('hello');
                          // navigation.navigate('Question Detail', {data: que[0]});
                          navigation.navigate('Upload Answer', {data: que[0]});
                        }}>
                        <Icon
                          name="create"
                          size={25}
                          // onPress={() => navigation.navigate('Signup')}
                        />
                        <Icon
                          style={{marginLeft: 20}}
                          name="visibility"
                          size={25}
                          onPress={() => {
                            // Alert.alert('hello');
                            // navigation.navigate('Question Detail', {data: que[0]});
                            navigation.navigate('Answers', {data: que[0]});
                          }}
                        />
                      </Text>
                    </View>
                    {/* <View>
                      <Text
                        style={{...style.textStyle2, color: '#808080'}}
                        onPress={() => {
                          // Alert.alert('hello');
                          // navigation.navigate('Question Detail', {data: que[0]});
                          navigation.navigate('Answers', {data: que[0]});
                        }}>
                        <Icon
                          name="visibility"
                          size={25}
                          // onPress={() => navigation.navigate('Signup')}
                        />
                      </Text>
                    </View> */}
                    <View>
                      <Text style={{...style.textStyle2, color: '#C0c'}}>
                        {categoryOfId(item.category_id)}
                      </Text>
                    </View>
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
