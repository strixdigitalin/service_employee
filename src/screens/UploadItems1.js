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

import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';

import {AddQuestions} from '../Api/Questions';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import {getImageUrl} from '../Api/Localstorage';
// import {Icon} from 'react-native-vector-icons/MaterialIcons';
// import

export default function UploadItems() {
  const audioRecorderPlayer = new AudioRecorderPlayer();

  const {width, height} = Dimensions.get('screen');
  const [questionType, setQuestionType] = useState('select');
  const [questionImage, setQuestionImage] = useState('null');
  const [questionAudio, setQuestionAudio] = useState('null');
  const [question, setQuestion] = useState('');
  const [recordState, setrecordState] = useState({});

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
  };

  const submitForm = async () => {
    // Alert.alert('Question Successfully uploaded');
    const formData = {
      question: question,
      category_id: questionType,
      audio_uri: questionAudio,
      image_uri: questionImage,
    };

    try {
      AddQuestions(formData, res => {
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

  const onStartRecord = async () => {
    // const result = await audioRecorderPlayer.startRecorder();
    // audioRecorderPlayer.addRecordBackListener(e => {
    //   setrecordState({
    //     recordSecs: e.currentPosition,
    //     recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
    //   });
    //   return;
    // });

    const path = 'hello.m4a';

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    console.log('audioSet', audioSet);
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
    audioRecorderPlayer.addRecordBackListener(e => {
      setrecordState({
        recordSecs: e.current_position,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
      });
    });
    console.log(`uri: ${uri}`);

    // console.log(result);
  };

  const onStopRecord = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setrecordState({
        recordSecs: 0,
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const onStartPlay = async () => {
    console.log('onStartPlay');
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      setrecordState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };

  return (
    <ScrollView style={{padding: 15, marginTop: 5}}>
      {/* <Image source={{uri: questionImage}} /> */}
      <View
        style={{
          borderWidth: 1,
          borderRadius: 80,
          marginBottom: 20,
          flexDirect: 'row',
          justifyContent: 'center',
        }}>
        <View style={{width: 100}}>
          <Picker
            selectedValue={questionType}
            style={{height: 50, width: 300}}
            onValueChange={(itemValue, itemIndex) => {
              setQuestionType(itemValue);
            }}>
            <Picker.Item label="Select Type" value={null} />
            <Picker.Item label="Sales" value="2" />
            <Picker.Item label="Marketing" value="1" />
            <Picker.Item label="Technical" value="3" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
      </View>
      <TouchableOpacity
        style={{marginBottom: 20}}
        onPress={() => chooseImage()}>
        {questionImage != 'null' && (
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              marginBottom: 10,
            }}>
            <Image
              source={{uri: questionImage.uri}}
              style={{height: 150, width: 150}}
            />
          </View>
        )}
        <Text
          style={{
            borderColor: '#4682B4',
            borderWidth: 2,
            paddingVertical: 12,
            fontSize: 16,
            fontWeight: 'bold',
            borderRadius: 5,
            textAlign: 'center',
          }}>
          {/* Upload Image */}

          {questionImage != 'null' ? 'Image Uploaded' : ' Upload Image'}
          {/* {questionImage?.name} */}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginBottom: 20}}
        onPress={() => uploadAudFiles()}>
        <Text
          style={{
            borderColor: '#4682B4',
            borderWidth: 2,
            paddingVertical: 12,
            fontSize: 16,
            fontWeight: 'bold',
            borderRadius: 5,
            textAlign: 'center',
          }}>
          {questionAudio != 'null' ? 'Start Recording' : 'Upload Audio'}
          {/* <Icon
            name="mic"
            size={28}
            // onPress={() => navigation.navigate('Signup')}
          />  */}
          {questionAudio?.name}
        </Text>
      </TouchableOpacity>
      <View style={{height: 30}}></View>
      <Text>
        {' '}
        {recordState.playTime} {recordState.currentDurationSec}
      </Text>
      <View>
        <Text onPress={onStartRecord}>start</Text>
        <View style={{height: 10}}></View>
        <Text onPress={onStopRecord}>stop</Text>
        <View style={{height: 10}}></View>
        <Text>start</Text>
        <View style={{height: 10}}></View>
      </View>
      <Text style={style.textStyle}>Question</Text>
      {/* <View style={style.inputContainer}> */}
      <TextInput
        multiline
        style={{fontSize: 18, minHeight: 200, backgroundColor: '#ffffff'}}
        onChangeText={text => {
          console.log(text);
          setQuestion(text);
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
        <Text style={style.textStyle2}>Upload Question</Text>
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
