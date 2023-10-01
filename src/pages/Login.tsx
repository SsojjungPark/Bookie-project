import styled from '@emotion/styled';
import { ReactComponent as GoogleLogo } from '../assets/googleLogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../regex';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase-config';

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

interface LoginInputs {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginInputs>({ mode: 'onChange' });

  const navigate = useNavigate();

  const togglePwVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Google 소셜 로그인
  const loginWithGoogle = async () => {
    try {
      const googleAuthProvider = new GoogleAuthProvider();
      // 사용자가 현재 구글 계정으로 로그인되어 있는 경우에도 다른 계정으로 로그인하도록 옵션 제공
      googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, googleAuthProvider);
      const user = result.user;
      console.log('Google 로그인 성공: ', user);

      navigate('/');
    } catch (error) {
      console.log('Google 로그인 실패: ', error);
    }
  };

  // 비밀번호 찾기
  // const findPasswordHandler = async (data: LoginInputs) => {
  //   try {
  //     await sendPasswordResetEmail(auth, data.email);

  //     alert('이메일이 전송되었습니다.');
  //   } catch (error) {
  //     console.log('error:', error);
  //   }
  // };

  // firebase authentication 로그인
  const signInWithEmailAndPasswordHandler = async (data: LoginInputs) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);

      console.log('로그인 성공: ', userCredential.user);
      navigate('/');
    } catch (error) {
      console.log('로그인 실패: ', error);

      if (error) {
        alert('올바른 이메일과 비밀번호를 입력해주세요.');
      }
    }
  };

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    signInWithEmailAndPasswordHandler(data);

    console.log('data', data);
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <StyledLink to="/">
          <Logo>Bookie</Logo>
        </StyledLink>
        <Title>로그인</Title>

        <LoginOptionWrapper>
          <SocialLogin>
            <GoogleLoginBtn onClick={loginWithGoogle} type="button">
              <GoogleLogoImg />
              <span>Google</span>로 로그인하기
            </GoogleLoginBtn>
          </SocialLogin>

          <Divider>OR</Divider>

          <LoginFormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
              <LoginFormBlock>
                <Input
                  {...register('email', {
                    required: true,
                    pattern: EMAIL_REGEX,
                  })}
                  type="text"
                  placeholder="ex) abc123@naver.com"
                />
                <Label>이메일</Label>
              </LoginFormBlock>
              <LoginFormBlock>
                <Input
                  {...register('password', {
                    required: true,
                    minLength: 8,
                    pattern: PASSWORD_REGEX,
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="8자 이상의 알파벳, 숫자, 기호 조합으로 입력해주세요."
                  autoComplete="off"
                />
                <Label>비밀번호</Label>
                <PasswordIcon onClick={togglePwVisibility}>{showPassword ? eye : eyeSlash}</PasswordIcon>
                {/* <FindPassword>비밀번호 찾기</FindPassword> */}
              </LoginFormBlock>

              <LoginBtn type="submit" value="로그인" disabled={!isValid} />
            </form>
          </LoginFormWrapper>
        </LoginOptionWrapper>

        <MoveToSignup>
          아직 회원이 아니신가요?<MoveToSignupLink to="/signup">회원가입</MoveToSignupLink>
        </MoveToSignup>
      </LoginWrapper>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 100%;
  background-color: var(--white-color);
`;

const LoginWrapper = styled.div`
  width: 1200px;
  height: 1200px;
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.h1`
  text-align: center;
  margin: 50px 0 100px;

  font-family: 'Lucida Bright Demibold V1';
  font-size: 20px;
  letter-spacing: 1px;
  color: var(--logo-color);
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 120px;
  color: var(--black-color);
`;

const LoginOptionWrapper = styled.div`
  width: 430px;
  margin: 0 auto;
`;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
`;

const GoogleLoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  border: 1px solid var(--signup-input);
  background-color: #f5f5f5;
  border-radius: var(--border-radius);
  font-size: 15px;
  color: rgba(29, 28, 28, 0.9);

  &: hover {
    cursor: pointer;
  }

  span {
    font-weight: 700;
  }
`;

const GoogleLogoImg = styled(GoogleLogo)`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

const Divider = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 16px;
  color: var(--signup-input);
  margin: 90px 0;

  &::before,
  &::after {
    content: '';
    position: relative;
    bottom: 7px;
    flex: 1;
    border-bottom: 1px solid;
    margin: 0 10px;
  }
`;

const LoginFormWrapper = styled.div``;

const LoginFormBlock = styled.div`
  position: relative;
  clear: both;
  display: flex;
  flex-direction: column;
  padding-top: 23px;

  &:not(:last-of-type) {
    margin-bottom: 45px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 10px;
  border: 1px solid var(--signup-input);
  border-radius: var(--border-radius);
  font-size: 15px;
  color: var(--black-color);
  outline: none;

  &::placeholder {
    font-size: 13px;
    color: var(--placehodler-gray);
  }

  &:focus {
    border: 2px solid var(--brown-color);
  }

  &:focus + label {
    color: var(--logo-color);
    font-weight: 500;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--signup-input);
`;

const PasswordIcon = styled.i`
  position: absolute;
  top: 39px;
  right: 15px;
  font-size: 14px;
  color: #4d4d4d;

  &: hover {
    cursor: pointer;
  }
`;

const FindPassword = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 15px;
  font-size: 14px;
  color: var(--logo-color);

  &:hover {
    cursor: pointer;
  }
`;

const LoginBtn = styled.input`
  margin-top: 85px;
  width: 100%;
  height: 48px;
  border: none;
  border-radius: var(--border-radius);
  color: var(--white-color);
  background-color: var(--light-brown);
  font-weight: 600;
  font-size: 16px;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: default;
    background-color: #dadada;
  }
`;

const MoveToSignup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px 0 15px 0;
  color: #575757;
  font-size: 15px;
`;

const MoveToSignupLink = styled(Link)`
  margin-left: 8px;
  color: #575757;

  &: hover {
    cursor: pointer;
    font-weight: 500;
    color: var(--logo-color);
  }
`;
