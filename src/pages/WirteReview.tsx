import styled from '@emotion/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useAuth } from '../context/AuthContext';
import QuillEditor from '../components/review/QuillEditor';
import { useNavigate } from 'react-router-dom';
import { Quill } from 'react-quill';

interface Inputs {
  bookImg: string;
  bookTitle: string;
  bookWriter: string;
  reviewTitle: string;
  content: string;
  createdAt: string;
  category: string;
  nickname: string;
  likes: number;
  uid: string;
}

const WriteReview = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [categoryVisible, setCategoryVisible] = useState<boolean>(false);
  const [reviewContent, setReviewContent] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [reviewNickname, setReviewNickname] = useState<string>('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<Inputs>({ mode: 'onChange', criteriaMode: 'all' });

  // 카테고리 토글
  const handleCategoryToggle = () => {
    setCategoryVisible(!categoryVisible);
  };

  // 카테고리 옵션 선택
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCategoryVisible(!categoryVisible);
  };

  // QuillEditor 컴포넌트에서 내용을 받아올 함수
  const handleEditorChange = (value: string) => {
    setReviewContent(value);
  };

  // 닉네임 불러오기
  useEffect(() => {
    const fetchUserNickname = async () => {
      if (currentUser) {
        try {
          const usersCollection = collection(db, 'users');
          const q = query(usersCollection, where('uid', '==', currentUser.uid));
          const querySnaptshot = await getDocs(q);

          const currentUserNickname = querySnaptshot.docs[0].data().nickname;

          setReviewNickname(currentUserNickname);
          setIsUserLoggedIn(true);

          console.log('닉네임 성공', currentUserNickname);
        } catch (error) {
          console.log('fetchUserNickname 실패: ', error);
        }
      }
    };

    fetchUserNickname();
  }, [currentUser]);

  // 등록 버튼 함수
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (isUserLoggedIn) {
      try {
        // 카테고리 영어로 변경
        const categoryMap: Record<string, string> = {
          소설: 'novel',
          인문: 'humanities',
          자기계발: 'sefImprovement',
        };
        const categoryInEnglish = categoryMap[selectedCategory];

        // 날짜
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const addReview = await addDoc(collection(db, categoryInEnglish), {
          bookImg:
            '' ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZc2ak60GYlraruLrL0csnJ4gS4CV30WNSvoPJLnqZEgiUY2ri-qOmoOuYQW2SKpqHAac&usqp=CAU',
          bookTitle: data.bookTitle,
          bookWriter: data.bookWriter,
          reviewTitle: data.reviewTitle,
          content: reviewContent,
          createdAt: formattedDate,
          category: categoryInEnglish,
          uid: currentUser?.uid,
          nickname: reviewNickname,
          likes: 0,
        });

        navigate(`/${categoryInEnglish}`);
        console.log('리뷰 저장 성공');
      } catch (error) {
        console.log('리뷰 저장 실패:', error);
      }
    }
  };

  return (
    <>
      <Header />

      <WriteReviewContainer>
        <WriteReviewTitle>리뷰 작성</WriteReviewTitle>

        <FormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CategoryArea>
              <CategoryBox onClick={handleCategoryToggle}>
                <CategoryDesc>{selectedCategory || '카테고리를 선택해주세요.'}</CategoryDesc>
                <ToggleBtn icon={faAngleDown} />
              </CategoryBox>
              {categoryVisible && (
                <CategoryOptionsUl>
                  <CategoryOptionLi onClick={() => handleCategoryClick('소설')}>소설</CategoryOptionLi>
                  <CategoryOptionLi onClick={() => handleCategoryClick('인문')}>인문</CategoryOptionLi>
                  <CategoryOptionLi onClick={() => handleCategoryClick('자기계발')}>자기계발</CategoryOptionLi>
                </CategoryOptionsUl>
              )}
            </CategoryArea>

            <BookInfo>
              <InputBookTitle
                {...register('bookTitle', { required: true })}
                type="text"
                spellCheck="false"
                placeholder="책 제목을 입력해주세요."
              />
              <InputBookWriter
                {...register('bookWriter', { required: true })}
                type="text"
                spellCheck="false"
                placeholder="책 저자를 입력해주세요."
              />
            </BookInfo>
            <InputReviewTitle
              {...register('reviewTitle', { required: true })}
              type="text"
              placeholder="리뷰 제목을 입력해주세요."
              spellCheck="false"
            />
            <QuillEditor editorOnChange={handleEditorChange} />

            <ButtonsArea>
              <RegisterBtn type="submit">등록</RegisterBtn>
              <EditBtn type="button">수정</EditBtn>
              <DeleteBtn type="button">삭제</DeleteBtn>
            </ButtonsArea>
          </form>
        </FormWrapper>
      </WriteReviewContainer>

      <Footer />
    </>
  );
};

export default WriteReview;

const WriteReviewContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  background-color: var(--white-color);
`;

const WriteReviewTitle = styled.div`
  font-weight: 700;
  font-size: 30px;
  margin: 100px 0 70px;
`;

const FormWrapper = styled.div``;

const CategoryArea = styled.div`
  width: 250px;
  position: relative;
`;

const CategoryBox = styled.div`
  width: 250px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--signup-input);
  font-size: 13px;
  padding: 0 10px;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const CategoryDesc = styled.span`
  color: var(--placehodler-gray);
  font-weight: 400;
`;

const ToggleBtn = styled(FontAwesomeIcon)`
  font-size: 14px;
  color: #595959;
`;

const CategoryOptionsUl = styled.ul`
  position: absolute;
  width: 270px;
  padding-top: 5px;
  box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.09);
  background-color: var(--white-color);
  z-index: 5;
`;

const CategoryOptionLi = styled.li`
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 10px;
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--black-color);

  &: hover {
    cursor: pointer;
    background-color: #f5f6f8;
    font-weight: 500;
  }
`;

const BookInfo = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  margin-bottom: 10px;

  input {
    width: 594px;
    height: 38px;
    border: 1px solid var(--signup-input);
    padding: 0 10px;
    outline: none;
    font-size: 14px;

    &::placeholder {
      font-size: 13px;
      color: var(--placehodler-gray);
    }
  }
`;

const InputBookTitle = styled.input``;

const InputBookWriter = styled.input``;

const InputReviewTitle = styled.input`
  margin-bottom: 10px;
  width: 100%;
  height: 38px;
  border: 1px solid var(--signup-input);
  padding: 0 10px;
  outline: none;
  font-size: 14px;

  &::placeholder {
    font-size: 13px;
    color: var(--placehodler-gray);
  }
`;

const ButtonsArea = styled.div`
  float: right;
  margin-top: 35px;

  button {
    width: 64px;
    height: 34px;
    border: none;
    border-radius: var(--border-radius);
    font-weight: 500;
    font-size: 13px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const RegisterBtn = styled.button`
  color: var(--white-color);
  background-color: var(--light-brown);
`;

const EditBtn = styled.button`
  backgroun-color: #e7e7e7;
  color: var(--black-color);
  margin-right: 10px;
`;

const DeleteBtn = styled.button`
  background-color: var(--orange-color);
  color: var(--white-color);
`;
