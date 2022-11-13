import React, {useState} from 'react';
import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import COLORS from '../constants/colors';
import {localStore} from '../LocalData/AsyncManager';
import {launchImageLibrary} from 'react-native-image-picker';
import {AddQuestions} from '../Api/Questions';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import {categoryOfId, getImageUrl} from '../Api/Localstorage';
import {AddAnswer} from '../Api/Answer';
// import

export default function UploadAnswer({route}) {
  const data = route.params.data.Question;
  const Answers = route.params.data.answers;

  const {width, height} = Dimensions.get('screen');
  const [questionType, setQuestionType] = useState('select');
  const [questionImage, setQuestionImage] = useState('null');
  const [questionAudio, setQuestionAudio] = useState('null');
  const [answer, setanswer] = useState('');

  const handleChange = (name, value) => {
    console.log('\nname\n', name, '\nvalue\t', value);
    setFormData({...formData, [name]: value});
  };

  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response.assets[0]);
      console.log(response, '<<<<image response');
      let newFile = {
        uri: response.assets[0].uri,
        // type: `service/${response.assets[0].uri.split('.')[1]}`,
        type: response.assets[0].type,
        // name: `service/${response.assets[0].uri.split('.')[1]}`,
        name: response.assets[0].fileName,
      };
      // getImageUrl(newFile);
      setQuestionImage(newFile);
    });

    return null;
    // cloudinary.config({
    //   cloud_name: 'quink-post',
    //   api_key: '235916351626745',
    //   api_secret: 'odzPTkisesRC-a_AgrbAYUho_PU',
    // });

    // var base64String = base64Encode(response.assets[0].uri);
    // const uploadString = 'data:image/jpeg;base64,' + base64String;
    // const uploadResponse = cloudinary.uploader.upload(uploadString, {
    //   overwrite: true,
    //   invalidate: true,
    //   width: 810,
    //   height: 456,
    //   crop: 'fill',
    // });
    // console.log(uploadResponse, '<<<cloudinary response');
  };

  const submitForm = async () => {
    // Alert.alert('Question Successfully uploaded');
    const formData = {
      id: data.id,
      answer,
    };

    try {
      AddAnswer(formData, res => {
        console.log(res);
        if (res.Status) {
          Alert.alert(res.message);
        }
      });
      // localStore.uploadProducts(formData, res => {
      //   if (res.success) {
      //     Alert.alert('Product Uploaded Successfully');
      //   }
      // });
    } catch (e) {
      console.log(e);
    }
  };
  const uploadAudFiles = async () => {
    const res = await DocumentPicker.pick({
      // Provide which type of file you want user to pick
      type: [DocumentPicker.types.audio],
      // There can me more options as well
      // DocumentPicker.types.allFiles
      // DocumentPicker.types.images
      // DocumentPicker.types.plainText
      // DocumentPicker.types.audio
      // DocumentPicker.types.pdf
    });
    newFile = {
      uri: res.uri,
      // type: `service/${res.assets[0].uri.split('.')[1]}`,
      type: res.type,
      // name: `service/${res.assets[0].uri.split('.')[1]}`,
      name: res.name,
    };
    setQuestionAudio(newFile);

    console.log(res, '<<<res audio');
  };

  return (
    <ScrollView style={{padding: 15, marginTop: 5}}>
      {/* <Image source={{uri: questionImage}} /> */}
      {data.image_uri != null && (
        <Image
          style={{height: 200, objectFit: 'contain'}}
          source={{
            uri: `https://strix-qa-client.herokuapp.com/storage/app/public/question/image/Q2R7KqQdUUFss7qNx6y29KCViW0Hy1flyIiRjO6t.jpg`,
          }}
        />
      )}
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
            <Text
              style={{
                ...style.textStyle,
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 10,
              }}>
              Question
            </Text>
            <Text style={style.textStyle}>{data?.question}</Text>
          </View>
          <View style={style.card}>
            <Text style={style.textStyle2}></Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              {/* <Text style={{...style.textStyle2, color: '#C0c'}}>
                {categoryOfId(data.category_id)}
              </Text> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{height: 30}}></View>

      <Text style={style.textStyle}>Add Your Answer</Text>
      {/* <View style={style.inputContainer}> */}
      <TextInput
        multiline
        style={{fontSize: 18, minHeight: 200, backgroundColor: '#ffffff'}}
        onChangeText={text => {
          console.log(text);
          setanswer(text);
        }}
      />
      {/* </View> */}
      {/* <Text style={style.textStyle}>Product Description</Text>
      <View style={style.inputContainer}>
        <TextInput style={{flex: 1, fontSize: 18}} />
      </View>
      <Text style={style.textStyle}>Quantity</Text>
      <View style={style.inputContainer}>
        <TextInput style={{flex: 1, fontSize: 18}} />
      </View>
      <Text style={style.textStyle}>Price (In Rs)</Text>
      <View style={style.inputContainer}>
        <TextInput style={{flex: 1, fontSize: 18}} />
      </View> */}

      <TouchableOpacity
        onPress={submitForm}
        style={{
          alignSelf: 'center',
          marginTop: 20,
          backgroundColor: COLORS.themeColor,
          paddingHorizontal: 30,
          paddingVertical: 10,
          borderRadius: 7,
        }}>
        <Text style={style.textStyle2}>Upload Answer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: 150,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    // elevation: 2,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: '600',
  },
  textStyle2: {
    fontSize: 19,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.9)',
  },
});
