import React, { useContext } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { login } from '../util/auth';
import { AuthContext } from '../store/auth-context';
import { Alert } from 'react-native';

const LoginScreen = () => {
  // loginHandler 로 전달되는 매개값은 3게(email, password, name)
  // name 은  login 쪽에서 사용할 일이 없음, email, password 만 구조 분해 할당
  const loginHandler = async ({ email, password }) => {
    const { authenticate } = useContext(AuthContext);

    console.log('loginHandler email', email);

    // 엑세스 토큰과 리플레쉬 토큰이 맵 형태로 가지고 있음
    try {
      const token = await login(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(error);
    }
  };

  return <AuthContent isLogin onlogin={loginHandler} />;
};

export default LoginScreen;
