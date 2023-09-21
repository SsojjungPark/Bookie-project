import styled from '@emotion/styled';
import { ReactComponent as GoogleLogo } from '../assets/googleLogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../regex';

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
    formState: { errors, isValid },
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => console.log('data', data);

  const togglePwVisibility = () => {
    setShowPassword(!showPassword);
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
            <GoogleLoginBtn type="button">
              <GoogleLogoImg />
              <span>Google</span>로 로그인하기
            </GoogleLoginBtn>
          </SocialLogin>

          <Divider>OR</Divider>

          <LoginFormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
              <LoginFormBlock>
                <Label>이메일</Label>
                <Input
                  {...register('email', {
                    required: '이메일을 다시 입력해주세요.',
                    pattern: { value: EMAIL_REGEX, message: '올바른 이메일 형식으로 입력해주세요.' },
                  })}
                  type="text"
                  placeholder="ex) abc123@naver.com"
                />
                {errors.email && (
                  <ErrorMessage>
                    <ErrorIcon icon={faCircleExclamation} />
                    {errors.email.message}
                  </ErrorMessage>
                )}
              </LoginFormBlock>
              <LoginFormBlock>
                <Label>비밀번호</Label>
                <Input
                  {...register('password', {
                    required: '비밀번호를 다시 입력해주세요.',
                    minLength: { value: 8, message: '8자 이상의 알파벳, 숫자, 기호 조합으로 입력해주세요.' },
                    pattern: { value: PASSWORD_REGEX, message: '영문, 숫자, 기호 조합으로 입력해주세요.' },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="8자 이상의 알파벳, 숫자, 기호 조합으로 입력해주세요."
                  autoComplete="off"
                />
                <PasswordIcon onClick={togglePwVisibility}>{showPassword ? eye : eyeSlash}</PasswordIcon>
                {errors.password && (
                  <ErrorMessage>
                    <ErrorIcon icon={faCircleExclamation} />
                    {errors.password.message}
                  </ErrorMessage>
                )}
              </LoginFormBlock>

              <LoginBtn type="submit" value="로그인" disabled={!isValid} />
            </form>
          </LoginFormWrapper>
        </LoginOptionWrapper>

        <MoveToSignup>
          아직 회원이 아니신가요?<span>회원가입</span>
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

  &:not(:last-of-type) {
    margin-bottom: 45px;
  }
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-size: 15px;
  color: var(--signup-input);
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 10px;
  border: 1px solid var(--signup-input);
  border-radius: var(--border-radius);
  font-size: 15px;
  outline: none;

  &::placeholder {
    font-size: 13px;
    color: var(--placehodler-gray);
  }

  &:focus {
    border: 2px solid var(--signup-input);
  }
`;

const PasswordIcon = styled.i`
  position: absolute;
  top: 41px;
  right: 15px;
  color: #4d4d4d;

  &: hover {
    cursor: pointer;
  }
`;

const ErrorIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  font-size: 14px;
  color: var(--red-color);
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: var(--red-color);
  margin-top: 10px;
`;

const LoginBtn = styled.input`
  margin-top: 100px;
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
  margin-top: 40px;
  color: #575757;

  span {
    margin-left: 8px;
    text-decoration: underline;
  }

  span: hover {
    cursor: pointer;
    font-weight: 500;
  }
`;
