import styled from '@emotion/styled';
import Header from '../components/Header';
import Comment from '../components/Comment';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, collection, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

interface ReviewDatasType {
  bookImg: string;
  bookTitle: string;
  bookWriter: string;
  reviewTitle: string;
  nickname: string;
  createdAt: string;
  content: string;
  likes: number;
}

const ReviewPost = () => {
  const [review, setReview] = useState<ReviewDatasType | null>(null);
  const { id: reviewId } = useParams();

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const docRef = doc(collection(db, 'boards'), reviewId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const reviewData = docSnap.data() as ReviewDatasType;
          setReview(reviewData);

          console.log('reviewData가 있습니다.');
        } else {
          console.log('reviewData가 없습니다.');
        }
      } catch (error) {
        console.log('fetchReviewData 실패: ', error);
      }
    };

    fetchReviewData();
  }, []);

  return (
    <>
      <Header />

      <ReviewPostContainer>
        <ReviewCommentWrapper>
          <ReviewContainer>
            <BookArea>
              <BookImage src={review?.bookImg} alt="책 제목" />

              <BookInfo>
                <BookTitle>{review?.bookTitle}</BookTitle>
                <BookWriter>{review?.bookWriter}</BookWriter>
              </BookInfo>
            </BookArea>

            <ReviewArea>
              <ReviewTitleWrapper>
                <ReviewTitle>{review?.reviewTitle}</ReviewTitle>
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
                <Nickname>{review?.nickname}</Nickname>
                <Date>{review?.createdAt}</Date>
              </UserInfo>

              <ReviewContent>{review?.content}</ReviewContent>
            </ReviewArea>
          </ReviewContainer>

          <LikeCommentWrapper>
            <LikeArea>
              <LikeIcon icon={faHeart} />
              <LikedIcon icon={fullHeart} />
              좋아요
              <span>{review?.likes}</span>
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
  width: 180px;
  height: 270px;
  object-fit: cover;
`;

const BookInfo = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
`;

const BookTitle = styled.div`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 15px;
`;

const BookWriter = styled.div`
  font-size: 13px;
  color: var(--dark-gray);
`;

const ReviewArea = styled.div`
  width: 100%;
`;

const ReviewTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  padding-left: 15px;
`;

const ReviewTitle = styled.div`
  font-weight: 700;
  font-size: 22px;
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
  width: 40px;
  height: 40px;
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
  line-height: 30px;
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
