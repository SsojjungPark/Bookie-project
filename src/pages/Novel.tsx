import styled from '@emotion/styled';
import Header from '../components/Header';
import ReviewList from '../components/ReviewLists';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const Novel = () => {
  return (
    <ReviewContainer>
      <Header />

      <ReviewWrapper>
        <Title>소설</Title>

        <ReviewList />

        <WriteBtn type="button">
          <WriteIcon icon={faPen} />
          글쓰기
        </WriteBtn>
      </ReviewWrapper>

      <Footer />
    </ReviewContainer>
  );
};

export default Novel;

const ReviewContainer = styled.div`
  background-color: var(--white-color;);
`;

const ReviewWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 27px;
  margin: 100px 0 50px 0;
`;

const WriteBtn = styled.button`
  float: right;
  margin-top: 40px;
  width: 85px;
  height: 38px;
  font-size: 14px;
  background-color: #f5f5f5;
  border: 1px solid var(--signup-input);
  border-radius: var(--border-raidus);

  &:hover {
    cursor: pointer;
  }
`;

const WriteIcon = styled(FontAwesomeIcon)`
  font-size: 14px;
  margin-right: 5px;
`;
