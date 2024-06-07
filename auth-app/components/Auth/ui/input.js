import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../../../constants/styles';

const Input = ({
  label,
  keyBoardType,
  secure,
  onUpdateValue,
  value,
  isInValid,
}) => {
  return (
    <View>
      <Text style={isInValid && styles.labelInValid}>{label}</Text>
      <TextInput
        // 스타일 적용이 두개 이상이면 배열로 묶어서 전달 해줘야함
        style={[styles.input, isInValid && styles.inputInValid]}
        autoCapitalize='none'
        keyboardType={keyBoardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  labelInValid: {
    color: Colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInValid: {
    backgroundColor: Colors.error100,
  },
});
