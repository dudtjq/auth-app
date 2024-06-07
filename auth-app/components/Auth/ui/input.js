import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const input = () => {
  return (
    <View>
      <TextInput />
    </View>
  );
};

export default input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
});
