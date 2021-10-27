import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Button, StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './src/theme';
import AppLoading from 'expo-app-loading';
// components
import Input from './src/components/Input';
import IconButton from './src/components/IconButton';
import images from './src/images';
import Task from './src/components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background };
  align-items: center;
  justify-content: flex-start;
`

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.main };
  align-self: flex-start;
  margin: 0px 20px;
`;

const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

export default function App() {
  const [ newTask, setNewTask ] = useState('');
  const [ tasks, setTasks ] = useState({});
  const [ isReady, setIsReady ] = useState(false);

  const _saveTask = async tasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      setTasks(tasks);
    } catch (e) {
      console.log(e);
    }
  };
  const _loadTasks = async () => {
    const loadedTasks = await AsyncStorage.getItem('tasks');
    setTasks(JSON.parse(loadedTasks || '{}'));
  };

  // const [ tasks, setTasks ] = useState({
  //   '1': { id: '1', text: 'create', completed: false },
  //   '2': { id: '2', text: 'read', completed: false },
  //   '3': { id: '3', text: 'update', completed: false },
  //   '4': { id: '4', text: 'delete', completed: false },
  // })

  const _handleTextChange = text => {
    setNewTask(text);
  };

  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]: { id: ID, text: newTask, completed: false },
    };
    setNewTask('');
    _saveTask({ ... tasks, ...newTaskObject })
    // setTasks({ ...tasks, ...newTaskObject })
  }

  const _deleteTask = id => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    _saveTask(currentTasks);
    // setTasks(currentTasks);
  };

  const _toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    _saveTask(currentTasks);
    // setTasks(currentTasks);
  };

  const _updateTask = item => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[item.id] = item;
    _saveTask(currentTasks);
    // setTasks(currentTasks);
  };

  const _onBlur = () => {
    setNewTask('');
  };

  const width = Dimensions.get('window').width;

  return (
    isReady ? (
    <ThemeProvider theme={theme}>
      <Container>
        <StatusBar 
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Title>TODO List</Title>
        <Input
          placeholder="+ Add a Task"
          value={newTask}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
          onBlur={_onBlur}
        />
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(item => (
              <Task
                key={item.id}
                item={item} 
                deleteTask={_deleteTask}
                toggleTask={_toggleTask}
                updateTask={_updateTask}
              />
            ))
          }
        </List>
      </Container>
    </ThemeProvider> )
    : (
      <AppLoading 
        startAsync={_loadTasks}
        onFinish={() => setIsReady(true)}
        onError={console.error}
      />
    )
  );
}