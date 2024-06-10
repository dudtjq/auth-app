import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import AuthForm from './AuthForm';
import FlatButton from './ui/FlatButton';
import { Colors } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';

const AuthContent = ({ onlogin, isLogin }) => {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    name: false,
    password: false,
    confirmPassword: false,
  });

  const submitHandler = (credentials) => {
    let { email, name, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();
    const nameRegex = /^[가-힣]{2,4}$/;

    // 실제로 적용 할때는 각 입력창마다 정규표현식으로 검사하기
    const emailIsValid = email.includes('@');
    const nameIsValid = nameRegex.test(name);
    const passwordIsValid = password.length > 6;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!nameIsValid || !passwordsAreEqual)) // isisLogin 값에 따라
      // 검증 해야할 게 있고 안해야 할 것이 있다
    ) {
      Alert.alert('유효하지 않은 입력값이 있습니다. 다시 입력해 주세요.');
      setCredentialsInvalid({
        email: !emailIsValid,
        name: !nameIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }

    // 회원가입 or 로그인 처리
    onlogin({ email, password, name });
  };

  const switchAuthModeHandler = () => {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={StyleSheet.authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? '회원 가입하기' : '로그인 화면으로 이동하기'}
        </FlatButton>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
});
