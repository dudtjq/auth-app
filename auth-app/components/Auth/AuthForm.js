import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Input from './ui/input';

const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredComfirmPassword, setEnteredComfirmPassword] = useState('');

  const {
    email: emailIsValid,
    name: nameIsValid,
    password: passwordIsValid,
    confirmPassword: passwordDontMatch,
  } = credentialsInvalid;

  const updateInputValueHandler = (inputType, enteredValue) => {
    switch (inputType) {
      case 'email':
        setEnteredEmail(enteredValue);
        break;
      case 'name':
        setEnteredName(enteredValue);
        break;
      case 'password':
        setEnteredPassword(enteredValue);
        break;
      case 'confirmPassword':
        setEnteredComfirmPassword(enteredValue);
        break;
    }
  };

  const submitHandler = () => {
    console.log('버튼이 클릭됨');
    // 사용자의 입력 상태값을 객체로 포장해서 AuthContent에게 넘긴다 ->
    // 부모 쪽에서 유효성 증 할 것
    onSubmit({
      email: enteredEmail,
      name: enteredName,
      password: enteredPassword,
      confirmPassword: enteredComfirmPassword,
    });
  };

  return (
    <View>
      <View>
        <Input
          label='이메일 주소'
          keyBoardType='email-address'
          // bind() 는 javaScript 함수로, 나중에 실행할 함수를 미리 조정할 수 있게 함
          // bind() 에 제공되는 첫번째 인수는 곧 실행할 함수의 this 키워드로 설정됨
          // 두번째 인수는 지정한 함수에 전달할 값을 세팅하면 됨
          onUpdateValue={updateInputValueHandler.bind(this, 'email')}
          isInValid={emailIsValid}
          value={enteredEmail}
        />
        {!isLogin && (
          <Input
            label='이름'
            onUpdateValue={updateInputValueHandler.bind(this, 'name')}
            isInValid={nameIsValid}
            value={enteredName}
          />
        )}
        {!isLogin && (
          <Input
            label='비밀번호'
            secure
            onUpdateValue={updateInputValueHandler.bind(this, 'password')}
            isInValid={passwordIsValid}
            value={enteredPassword}
          />
        )}
        <Input
          label='비밀번호 확인'
          secure
          onUpdateValue={updateInputValueHandler.bind(this, 'confirmPassword')}
          isInValid={passwordDontMatch}
          value={enteredComfirmPassword}
        />
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? '로그인' : '회원가입'}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
