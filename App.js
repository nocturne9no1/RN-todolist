import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Button, StatusBar, Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './src/theme';
// components
import Input from './src/components/Input';
import IconButton from './src/components/IconButton';
import images from './src/images';
import Task from './src/components/Task';

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

  const _addTask = () => {
    alert(`ADD: ${newTask}`);
    setNewTask('');
  };

  const _handleTextChange = text => {
    setNewTask(text);
  };

  const width = Dimensions.get('window').width;

  return (
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
        />
        <List width={width}>
          <Task text="asdfasdf"/>
        </List>
      </Container>
    </ThemeProvider>
  );
}