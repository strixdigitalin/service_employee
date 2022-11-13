import React, {useState, useEffect} from 'react';
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
  PermissionsAndroid,
  DeviceEventEmitter,
} from 'react-native';
import COLORS from '../constants/colors';
import {localStore} from '../LocalData/AsyncManager';
import {launchImageLibrary} from 'react-native-image-picker';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';

import {AddQuestions} from '../Api/Questions';
import {Picker} from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import {getImageUrl} from '../Api/Localstorage';
import {Player, Recorder} from '@react-native-community/audio-toolkit';
// import useInterval from '../hooks/useInterval';
// import

const recorderConfig = {
  bitrate: 256000,
  channels: 2,
  sampleRate: 44100,
  quality: 'max',
};
var filename = '';
var recorderRef = new Recorder(filename, recorderConfig);
var playerRef = new Player(filename);

export default function UploadItems() {
  const audioRecorderPlayer = new AudioRecorderPlayer();

  const {width, height} = Dimensions.get('screen');
  const [questionType, setQuestionType] = useState('select');
  const [questionImage, setQuestionImage] = useState('null');
  const [questionAudio, setQuestionAudio] = useState('null');
  const [question, setQuestion] = useState('');
  const [recordState, setrecordState] = useState({});

  /// audio player Madhur developer////
  const [recordSec, setRecordSec] = useState(0);
  const [recordingTotalTime, setRecordingTotalTime] = useState('00:00:00');
  // const filename = 'test.mp4';
  const [isRecordingStart, setIsRecordingStart] = useState(false);
  const [isPlayerPlaying, setPlayerPlaying] = useState(false);
  // const [filename, setFileName] = useState('');

  React.useLayoutEffect(() => {
    setFileNameValue();
  }, []);

  const setFileNameValue = () => {
    // setFileName(`test${Math.random().toString().replace('0.', '')}.mp4`);
    filename = `test${Math.random().toString().replace('0.', '')}.mp4`;
    recorderRef = new Recorder(filename, recorderConfig);
    playerRef = new Player(filename);
  };

  useEffect(() => {
    DeviceEventEmitter.addListener(
      `RCTAudioPlayerEvent:${playerRef?._playerId}`,
      payload => {
        if (
          payload.event == 'ended' ||
          payload.event == 'error' ||
          payload.event == 'forcePause' ||
          payload.event == 'pause'
        ) {
          setPlayerPlaying(false);
        }
      },
    );
  }, []);
  // console.log({playerRef}, playerRef._playerId);

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
      quality: 0.5,
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
    console.log({recorderRef}, recorderRef?.fsPath, '<<<<< audio file path');
    const formData = {
      question: question,
      category_id: questionType,
      // audio_uri: questionAudio,
      audio_uri: {
        uri: 'file://' + recorderRef?.fsPath,
        name: filename,
        type: 'audio/mp4',
      },
      image_uri: questionImage,
    };
    console.log({formData});
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

  ////

  const updateRecordState = value => {
    setTimeout(() => {
      // console.log(recorderRef.isRecording);
      setIsRecordingStart(recorderRef.isRecording ?? false);
    }, 1500);
  };

  const updatePlayerState = () => {
    setTimeout(() => {
      setPlayerPlaying(playerRef?.isPlaying ?? false);
    }, 1500);
  };

  const onStartAudioRecord = async () => {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);

      recorderRef.record();
      updateRecordState();
    } catch (error) {
      console.log({error});
    }
  };
  console.log(
    'res.isRecording()',
    // audioRef?.isRecording(),
    recorderRef.isRecording,
  );

  const onStopAudioRecord = async () => {
    recorderRef.stop();
    updateRecordState();
  };

  const onPlayPauseAudioRecordng = async () => {
    playerRef.play();
    updatePlayerState();
  };

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setrecordState({
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      });
      return;
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setrecordState({
      recordSecs: 0,
    });
    console.log(result);
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
        }}>
        <Picker
          selectedValue={questionType}
          style={{height: 50, width: 300}}
          onValueChange={(itemValue, itemIndex) => {
            setQuestionType(itemValue);
          }}>
          <Picker.Item label="Select Type" value={null} />
          <Picker.Item label="Sales" value="3" />
          <Picker.Item label="Marketing" value="1" />
          <Picker.Item label="Technical" value="2" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
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
          {questionAudio != 'null' ? 'Audio Uploaded' : 'Upload Audio'}{' '}
          {/* {questionAudio?.name} */}
        </Text>
      </TouchableOpacity>

      <View style={{height: 30}}></View>

      <Text style={style.textStyle}>Question</Text>
      <Text style={style.textStyle}>{recordState?.recordTime}</Text>
      {/* <Text
        style={style.textStyle}
        onPress={() => {
          // Alert.alert('hello');
          onStartRecord();
        }}>
        Start
      </Text>
      <Text
        style={style.textStyle}
        onPress={() => {
          // Alert.alert('hello');
          onStopRecord();
        }}>
        stop
      </Text>
      <Text
        style={style.textStyle}
        onPress={() => {
          // Alert.alert('hello');
          onStartPlay();
        }}>
        Play
      </Text> */}

      <Text style={{color: 'black', fontSize: 17, lineHeight: 20}}>
        {`Recording Time${recordingTotalTime}---${recordSec} `}
      </Text>

      <View style={style.rocordRow}>
        <TouchableOpacity
          onPress={isRecordingStart ? onStopAudioRecord : onStartAudioRecord}
          style={{
            ...style.recordBut,
            backgroundColor: isRecordingStart
              ? COLORS.secondary
              : COLORS.themeColor,
            // color: isRecordingStart ? COLORS.themeColor : '#ffff',
          }}>
          <Text style={style.textStyle2}>
            {' '}
            {isRecordingStart ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onPlayPauseAudioRecordng}
          style={style.buttonContainer}>
          <Text style={style.textStyle2}>
            {' '}
            {isPlayerPlaying ? 'Stop' : 'Play'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => setFileNameValue()}
        style={style.buttonContainer}>
        <Text style={style.textStyle2}>Reload File</Text>
      </TouchableOpacity>

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

      <TouchableOpacity onPress={submitForm} style={style.buttonContainer}>
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
  rocordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  recordBut: {
    width: '50%',
    padding: 5,
    fontSize: 12,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: COLORS.themeColor,
    borderRadius: 10,
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
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: COLORS.themeColor,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 7,
  },
});
