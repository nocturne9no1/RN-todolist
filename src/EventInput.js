import React, { useState } from "react";
import { View, Text, TextInput } from 'react-native'

export default function EventInput() {
  const [text, setText ] =  useState('');
  const _onChange = event => setText(event.nativeEvent.text);

  return (
    <View>
      <Text>text: {text}</Text>
      <TextInput
        placeholder="Enter 'to do'"
        onChange={_onChange}
      />
    </View>
  );
};