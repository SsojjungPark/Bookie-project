import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EMAIL_REGEX, NICKNAME_REGEX, PASSWORD_REGEX } from '../regex';
import { useEffect, useRef, useState } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { getDocs } from 'firebase/firestore';

const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

interface FormInputs {
  name: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPwConfirm, setShowPwConfirm] = useState<boolean>(false);
  const [isNicknameAvailable, setIsNIcknameAvailable] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm<FormInputs>({ mode: 'onChange', criteriaMode: 'all' });

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  const navigate = useNavigate();

  // firebase Auth 회원가입 연동
  const signupWithEmailandPassword = async (data: FormInputs) => {
    try {
      const auth = getAuth();
      const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password);

      const userInfo = await addDoc(collection(db, 'users'), {
        uid: newUser.user.uid,
        name: data.name,
        nickname: data.nickname,
      });

      console.log('회원가입 성공: ', newUser);
    } catch (error) {
      console.log('회원가입 실패: ', error);
    }
  };

  // firestore 닉네임 데이터 가져오기
  const inputNickname = watch('nickname');

  useEffect(() => {
    // firestore 닉네임 데이터 가져오기
    const fetchUsersNickname = async (inputNickname: string) => {
      try {
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollection);

        const nicknamesArr = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return data.nickname;
        });

        // 닉네임 중복 확인
        const isDuplicate = nicknamesArr.includes(inputNickname);

        setIsNIcknameAvailable(!isDuplicate);

        // 중복 된 경우 에러 메시지 설정
        if (isDuplicate) {
          setError('nickname', {
            type: 'manual',
            message: '이미 사용 중인 닉네임 입니다.',
          });
        }

        console.log('fetchUsersData 성공');
      } catch (error) {
        console.log('fetchUsersData 실패: ', error);
      }
    };

    fetchUsersNickname(inputNickname);
  }, [inputNickname]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    signupWithEmailandPassword(data);
    navigate('/');

    console.log('data', data);
  };

  const togglePwVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePwConfirmVisibility = () => {
    setShowPwConfirm(!showPwConfirm);
  };

  return (
    <SignupContainer>
      <SignupWrapper>
        <StyledLink to="/">
          <Logo>Bookie</Logo>
        </StyledLink>

        <Title>회원가입</Title>

        <SignupFormWrapper>
          <SignupDesc>
            <span>*</span> 필수 입력 정보 입니다.
          </SignupDesc>

          <form onSubmit={handleSubmit(onSubmit)}>
            <SignupFormBlock>
              <Input
                {...register('name', {
                  required: '이름을 입력해주세요.',
                })}
                type="text"
                placeholder="이름을 입력해주세요."
              />
              {errors.name && (
                <ErrorMessageCon>
                  <ErrorIcon icon={faCircleExclamation} />
                  {errors.name.message}
                </ErrorMessageCon>
              )}
              <Label>
                이름 <span>*</span>
              </Label>
            </SignupFormBlock>
            <SignupFormBlock>
              <Input
                {...register('nickname', {
                  required: '닉네임을 입력해주세요.',
                  pattern: { value: NICKNAME_REGEX, message: '알파벳, 한글, 숫자를 이용해 입력해주세요.' },
                })}
                type="text"
                placeholder="영문, 한글, 숫자를 이용해 입력해주세요."
              />
              <Label>
                닉네임 <span>*</span>
              </Label>
              {errors.nickname && (
                <ErrorMessageCon>
                  <ErrorIcon icon={faCircleExclamation} />
                  {errors.nickname?.message}
                </ErrorMessageCon>
              )}
            </SignupFormBlock>
            <SignupFormBlock>
              <Input
                {...register('email', {
                  required: '이메일을 입력해주세요.',
                  pattern: { value: EMAIL_REGEX, message: '올바른 이메일 형식으로 입력해주세요.' },
                })}
                type="text"
                placeholder="ex) abc123@naver.com"
              />
              <Label>
                이메일 <span>*</span>
              </Label>
              {errors.email && (
                <ErrorMessageCon>
                  <ErrorIcon icon={faCircleExclamation} />
                  {errors.email.message}
                </ErrorMessageCon>
              )}
            </SignupFormBlock>
            <SignupFormBlock>
              <Input
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  minLength: { value: 8, message: '8자 이상의 알파벳, 숫자, 기호 조합으로 입력해주세요.' },
                  pattern: { value: PASSWORD_REGEX, message: '영문, 숫자, 기호 조합으로 입력해주세요.' },
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="8자 이상의 영문, 숫자, 기호 조합으로 입력해주세요."
                autoComplete="off"
              />
              <Label>
                비밀번호 <span>*</span>
              </Label>
              <PasswordIcon onClick={togglePwVisibility}>{showPassword ? eye : eyeSlash}</PasswordIcon>
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => (
                    <ErrorMessageCon key={type}>
                      <ErrorIcon icon={faCircleExclamation} />
                      {message}
                    </ErrorMessageCon>
                  ))
                }
              />
            </SignupFormBlock>
            <SignupFormBlock>
              <Input
                {...register('passwordConfirm', {
                  required: '비밀번호를 다시 입력해주세요.',
                  validate: { value: (value) => value === passwordRef.current || '비밀번호가 일치하지 않습니다.' },
                })}
                type={showPwConfirm ? 'text' : 'password'}
                placeholder="비밀번호를 다시 입력해주세요."
                autoComplete="off"
              />
              <Label>
                비밀번호 확인<span>*</span>
              </Label>
              <PasswordIcon onClick={togglePwConfirmVisibility}>{showPwConfirm ? eye : eyeSlash}</PasswordIcon>
              {errors.passwordConfirm && (
                <ErrorMessageCon>
                  <ErrorIcon icon={faCircleExclamation} />
                  {errors.passwordConfirm.message}
                </ErrorMessageCon>
              )}
            </SignupFormBlock>

            <SignupBtn type="submit" value="회원가입" disabled={!isValid} />
          </form>
        </SignupFormWrapper>
      </SignupWrapper>
    </SignupContainer>
  );
};

export default Signup;

const SignupContainer = styled.div`
  width: 100%;
  background-color: var(--white-color);
`;

const SignupWrapper = styled.div`
  width: 1200px;
  height: 1300px;
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
    border: 2px solid var(--logo-color);
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
  width: 100%;
  font-size: 14px;
  color: var(--signup-input);

  span {
    color: var(--red-color);
    font-weight: 500;
  }
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

const ErrorMessageCon = styled.div`
  font-size: 13px;
  color: var(--red-color);
  margin-top: 12px;
`;

const ErrorIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  font-size: 13px;
  color: var(--red-color);
`;

const SignupBtn = styled.input`
  margin-top: 100px;
  width: 100%;
  height: 48px;
  border: none;
  border-radius: var(--border-radius);
  background-color: var(--light-brown);
  font-weight: 600;
  font-size: 16px;
  color: var(--white-color);

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: default;
    background-color: #dadada;
  }
`;
