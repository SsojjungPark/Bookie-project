import styled from '@emotion/styled';
import Header from '../components/Header';
import Comment from '../components/Comment';
import Footer from '../components/Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';

const ReviewPost = () => {
  return (
    <>
      <Header />

      <ReviewPostContainer>
        <ReviewCommentWrapper>
          <ReviewContainer>
            <BookArea>
              <BookImage
                src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788958075226.jpg"
                alt="책 제목"
                width="180px"
                height="270px"
              />

              <BookInfo>
                <BookTitle>책 제목</BookTitle>
                <WriterPublisherWrapper>
                  <BookWriter>저자</BookWriter>
                  <Publisher>출판사</Publisher>
                </WriterPublisherWrapper>
              </BookInfo>
            </BookArea>

            <ReviewArea>
              <ReviewTitleWrapper>
                <ReviewTitle>리뷰 제목</ReviewTitle>
                <BookmarkIcon icon={faStar} />
                <BookmarkedIcon icon={fullStar} />
              </ReviewTitleWrapper>
              <UserInfo>
                <ProfileImg
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  alt="프로필사진"
                  width="40px"
                  height="40px"
                />
                <Nickname>닉네임</Nickname>
                <Date>작성일</Date>
              </UserInfo>

              <ReviewContent>리뷰 내용</ReviewContent>
            </ReviewArea>
          </ReviewContainer>

          <LikeCommentWrapper>
            <LikeArea>
              <LikeIcon icon={faHeart} />
              <LikedIcon icon={fullHeart} />
              좋아요
              <span>0</span>
            </LikeArea>
            <CommentArea>
              <CommentIcon icon={faCommentDots} />
              댓글
              <span>0</span>
            </CommentArea>
          </LikeCommentWrapper>

          <Comment />
        </ReviewCommentWrapper>
      </ReviewPostContainer>

      <Footer />
    </>
  );
};

export default ReviewPost;

const ReviewPostContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  border: 1px solid blue;
`;

const ReviewCommentWrapper = styled.div`
  width: 1200px;
  margin-top: 100px;
  background-color: var(--white-color);
`;

const ReviewContainer = styled.div`
  display: flex;
`;

const BookArea = styled.div`
  margin-right: 80px;
`;

const BookImage = styled.img`
  object-fit: cover;
`;

const BookInfo = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18px;
`;

const BookTitle = styled.div`
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 16px;
`;

const WriterPublisherWrapper = styled.div`
  display: flex;
  font-size: 14px;
  color: #595959;
`;

const BookWriter = styled.div`
  margin-right: 5px;
`;

const Publisher = styled.div``;

const ReviewArea = styled.div`
  width: 100%;
`;

const ReviewTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding-left: 15px;
`;

const ReviewTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-right: 25px;
`;

const BookmarkIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  color: #fcce00;

  &:hover {
    cursor: pointer;
  }
`;

const BookmarkedIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  color: #fcce00;

  &:hover {
    cursor: pointer;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 15px;
  padding-bottom: 25px;
  border-bottom: 1px solid #d9d9d9;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  border: 1px solid var(--singup-input);
  object-fit: cover;
  margin-right: 15px;
`;

const Nickname = styled.div`
  margin-right: 8px;
`;

const Date = styled.div``;

const ReviewContent = styled.div`
  min-height: 300px;
  padding: 25px 15px 15px;
  font-size: 15px;
`;

const LikeCommentWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 25px;
  border-bottom: 1px solid #d9d9d9;
`;

const LikeArea = styled.div`
  dispaly: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 15px;

  span {
    margin-left: 5px;
    font-weight: 600;
  }
`;

const LikeIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  margin-right: 5px;
  color: var(--red-color);

  &:hover {
    cursor: pointer;
  }
`;

const LikedIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  margin-right: 5px;
  color: var(--red-color);

  &:hover {
    cursor: pointer;
  }
`;

const CommentArea = styled.div`
  font-size: 15px;

  span {
    margin-left: 5px;
    font-weight: 600;
  }
`;

const CommentIcon = styled(FontAwesomeIcon)`
  dispaly: flex;
  align-items: center;
  font-size: 18px;
  margin-right: 5px;
`;
