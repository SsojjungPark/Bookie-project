import styled from '@emotion/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const WriteReview = () => {
  return (
    <>
      <Header />

      <WriteReviewContainer>
        <WriteReviewTitle>리뷰 작성</WriteReviewTitle>

        <FormWrapper>
          <form>
            <CategoryArea>
              <CategoryBox>
                <CategoryDesc>카테고리를 선택해주세요.</CategoryDesc>
                <ToggleBtn icon={faAngleDown} />
              </CategoryBox>
              <CategoryOptionsUl>
                <CategoryOptionLi>소설</CategoryOptionLi>
                <CategoryOptionLi>인문</CategoryOptionLi>
                <CategoryOptionLi>자기계발</CategoryOptionLi>
                <CategoryOptionLi>경제/사회</CategoryOptionLi>
              </CategoryOptionsUl>
            </CategoryArea>
            <InputTitle type="text" placeholder="제목을 입력해주세요." />

            <WriteReviewArea>
              <EditorToolBox>툴박스</EditorToolBox>
              <WriteReviewBox spellCheck="false" />
            </WriteReviewArea>

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
`;

const CategoryDesc = styled.span`
  color: var(--placehodler-gray);
  font-weight: 400;
`;

const ToggleBtn = styled(FontAwesomeIcon)`
  font-size: 14px;
  color: #595959;
  &: hover {
    cursor: pointer;
  }
`;

const CategoryOptionsUl = styled.ul`
  position: absolute;
  width: 270px;
  padding-top: 5px;
  box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.09);
  background-color: var(--white-color);

  display: none;
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

const InputTitle = styled.input`
  margin-top: 10px;
  width: 100%;
  height: 38px;
  border: 1px solid var(--signup-input);
  font-size: 13px;
  padding: 0 10px;
  outline: none;
  font-size: 14px;

  &::placeholder {
    font-size: 13px;
    color: var(--placehodler-gray);
  }
`;

const WriteReviewArea = styled.div`
  width: 1200px;
  margin-top: 10px;
`;

const EditorToolBox = styled.div`
  width: 100%;
  height: 35px;
  background-color: gray;
`;

const WriteReviewBox = styled.textarea`
  resize: none;
  outline: none;
  width: 100%;
  min-height: 500px;
  padding: 20px;
  font-size: 15px;
  line-height: 24px;
  border: 1px solid var(--signup-input);
  box-sizing: border-box;
  margin-bottom: 35px;
`;

const ButtonsArea = styled.div`
  float: right;

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
