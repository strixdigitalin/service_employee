import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigator from './src/screens/BottomNavigator';
import EditProducts from './src/screens/EditProducts';
import UploadItems from './src/screens/UploadItems';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import QuestionDetails from './src/screens/QuestionDetail';
import CategoryQuestion from './src/screens/CateogoryQuestions';
import UploadAnswer from './src/screens/UploadAnswer';
import AnswersOfQuestion from './src/screens/AnswersOfAQuestion';
import QuestionsOfUser from './src/screens/QuestionsOfUser';
import AdminDashboard from './src/screens/AdminDashboard';
import AllQuestions from './src/screens/AllQuestions';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#fff'} barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Editproduct"
          component={EditProducts}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Question Detail"
          component={QuestionDetails}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Answers"
          component={AnswersOfQuestion}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Questions asked by you"
          component={QuestionsOfUser}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Category Question"
          component={CategoryQuestion}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Upload Answer"
          component={UploadAnswer}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Admin Dashboard"
          component={AdminDashboard}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="All Question"
          component={AllQuestions}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="UploadItemScreen"
          component={UploadItems}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
