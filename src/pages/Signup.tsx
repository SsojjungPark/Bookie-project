import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

const Signup = () => {
  return (
    <SignupContainer>
      <SignupWrapper>
        <Logo>Bookie</Logo>
        <Title>회원가입</Title>

        <SignupFormWrapper>
          <SignupDesc>
            <span>*</span> 필수 입력 정보 입니다.
          </SignupDesc>

          <form>
            <SignupFormBlock>
              <Label>
                이름 <span>*</span>
              </Label>
              <Input type="text" name="name" placeholder="이름을 입력해주세요" />
            </SignupFormBlock>
            <SignupFormBlock>
              <Label>
                닉네임 <span>*</span>
              </Label>
              <Input type="text" name="nickname" placeholder="알파벳 대소문자 또는 한글로 입력해주세요." />
            </SignupFormBlock>
            <SignupFormBlock>
              <Label>
                이메일 <span>*</span>
              </Label>
              <Input type="text" name="email" placeholder="ex) abc123@naver.com" />
              <ErrorMessage>
                <ErrorIcon icon={faCircleExclamation} />
                올바른 이메일 형식으로 입력해주세요.
              </ErrorMessage>
            </SignupFormBlock>
            <SignupFormBlock>
              <Label>
                비밀번호 <span>*</span>
              </Label>
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
            </SignupFormBlock>
            <SignupFormBlock>
              <Label>
                비밀번호 확인<span>*</span>
              </Label>
              <Input
                type="password"
                name="passwordConfirm"
                placeholder="비밀번호를 다시 입력해주세요."
                autoComplete="off"
              />
              <HidePassword icon={faEyeSlash} />
              <ShowPassword icon={faEye} />
              <ErrorMessage>
                <ErrorIcon icon={faCircleExclamation} />
                비밀번호를 다시 입력해주세요.
              </ErrorMessage>
            </SignupFormBlock>

            <SignupBtn type="submit">회원가입</SignupBtn>
          </form>
        </SignupFormWrapper>
      </SignupWrapper>
    </SignupContainer>
  );
};

export default Signup;

const SignupContainer = styled.div`
  width: 100%;
`;

const SignupWrapper = styled.div`
  width: 1200px;
  height: 1300px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  text-align: center;
  margin: 50px 0 100px;

  font-family: 'Lucida Bright Demibold V1';
  font-size: 20px;
  letter-spacing: 1px;
  color: #b07127;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 120px;
  color: var(--black-color);
`;

const SignupFormWrapper = styled.div`
  width: 430px;
  margin: 0 auto;
`;

const SignupDesc = styled.div`
  float: right;
  font-size: 14px;
  color: var(--signup-input);
  margin-bottom: 30px;

  span {
    color: var(--red-color);
    font-weight: 500;
  }
`;

const SignupFormBlock = styled.div`
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

  span {
    color: var(--red-color);
    font-weight: 500;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 10px;
  border: 1px solid var(--signup-input);
  border-radius: 3px;
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

const ErrorMessage = styled.div`
  font-size: 14px;
  color: var(--red-color);
  margin-top: 10px;
`;

const ErrorIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  font-size: 14px;
  color: var(--red-color);
`;

const SignupBtn = styled.button`
  margin-top: 100px;
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 3px;
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
