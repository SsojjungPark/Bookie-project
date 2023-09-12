import styled from '@emotion/styled';
import { ReactComponent as GoogleLogo } from '../assets/googleLogo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const Login = () => {
  return (
    <LoginContainer>
      <LoginWrapper>
        <Logo>Bookie</Logo>
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
            <form>
              <LoginFormBlock>
                <Label>이메일</Label>
                <Input type="text" name="email" placeholder="ex) abc123@naver.com" />
                <ErrorMessage>
                  <ErrorIcon icon={faCircleExclamation} />
                  올바른 이메일 형식으로 입력해주세요.
                </ErrorMessage>
              </LoginFormBlock>
              <LoginFormBlock>
                <Label>비밀번호</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="8자리 이상의 알파벳, 숫자, 기호 조합"
                  autoComplete="off"
                />
                <HidePassword icon={faEyeSlash} />
                <ShowPassword icon={faEye} />
                <ErrorMessage>
                  <ErrorIcon icon={faCircleExclamation} />
                  8자리 이상의 알파벳 + 숫자 + 기호로 입력해주세요.
                </ErrorMessage>
              </LoginFormBlock>

              <LoginBtn type="button">로그인</LoginBtn>
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
  border-radius: var(--border-raidus);
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
  border-radius: var(--border-raidus);
  font-size: 15px;

  &::placeholder {
    font-size: 13px;
    color: var(--placehodler-gray);
  }

  &:focus {
    outline: none;
    border: 2px solid var(--rose-color);
  }
`;

const HidePassword = styled(FontAwesomeIcon)`
  position: absolute;
  top: 41px;
  right: 15px;
  color: #4d4d4d;
`;

const ShowPassword = styled(FontAwesomeIcon)`
  position: absolute;
  top: 41px;
  right: 15px;
  color: #4d4d4d;
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

const LoginBtn = styled.button`
  margin-top: 100px;
  width: 100%;
  height: 48px;
  border: none;
  border-radius: var(--border-raidus);
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
