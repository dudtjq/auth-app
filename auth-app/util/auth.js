// cmd 에서 IPv4 주소값
const AUTH_URL = 'http://192.168.0.18:8181/api/auth';

// fetch 사용
const authenticate = async (email, password) => {
  const url = AUTH_URL + '/signin';
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await res.json();
  console.log('로그인 결과', result);

  return result.token;
};

// 함수의 이름을 바꾸고 싶을 때는 사용할 함수 이름에 한번더 포장하여 리턴 한다
export function login(email, password) {
  return authenticate(email, password);
}

// 그냥 임포트 하고 싶을 때는 default 사용하여 바로 호출 한다
// export default authenticate;
