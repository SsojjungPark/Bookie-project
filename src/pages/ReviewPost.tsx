import styled from '@emotion/styled';
import Header from '../components/Header';
import Comment from '../components/comment/Comment';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical, faStar as fullStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, collection, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import CommentForm from '../components/comment/CommentForm';
import CommentList from '../components/comment/CommentList';
import { useAuth } from '../context/AuthContext';

interface ReviewDatasType {
  bookImg: string;
  bookTitle: string;
  bookWriter: string;
  reviewTitle: string;
  nickname: string;
  createdAt: string;
  content: string;
  likes: number;
  uid: string;
}

const ReviewPost = () => {
  const { currentUser } = useAuth();
  const { id: reviewId } = useParams();
  const { category } = useParams();

  const [review, setReview] = useState<ReviewDatasType | null>(null);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [visibleBtns, setVisibleBtns] = useState<boolean>(false);

  const handleCommentCountChange = (count: number) => {
    setCommentCount(count);
  };

  // 수정, 삭제 버튼 토글
  const isCurrentUserReview = currentUser?.uid === review?.uid;
  const handleToggleDotsBtnClick = () => {
    setVisibleBtns(!visibleBtns);
  };

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const docRef = doc(collection(db, `${category}`), reviewId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const reviewData = docSnap.data() as ReviewDatasType;
          setReview(reviewData);
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
                {isCurrentUserReview && (
                  <BtnsContainer>
                    <DotsIconWrapper onClick={handleToggleDotsBtnClick}>
                      <DotsIcon icon={faEllipsisVertical} />
                    </DotsIconWrapper>
                    {visibleBtns && (
                      <BtnsWrapperUl>
                        <EditBtn>수정</EditBtn>
                        <DeleteBtn>삭제</DeleteBtn>
                      </BtnsWrapperUl>
                    )}
                  </BtnsContainer>
                )}
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

              <ReviewContent dangerouslySetInnerHTML={{ __html: review?.content || '' }} />
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
              <span>{commentCount}</span>
            </CommentArea>
          </LikeCommentWrapper>

          <Comment>
            <CommentForm />
            <CommentList onCommentCountChange={handleCommentCountChange} />
          </Comment>
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
  padding-left: 20px;
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

const BtnsContainer = styled.div`
  position: relative;
  margin-left: auto;
`;

const DotsIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;

  &: hover {
    cursor: pointer;
  }
`;

const DotsIcon = styled(FontAwesomeIcon)`
  font-size: 18px;
  color: var(--signup-input);
`;

const BtnsWrapperUl = styled.ul`
  position: absolute;
  right: 0;
  width: 100px;
  padding-top: 5px;
  border-radius: var(--border-radius);
  background-color: var(--white-color);
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.09);

  li {
    display: flex;
    align-items: center;
    height: 32px;
    padding: 0 15px;
    margin-bottom: 5px;
    font-size: 13px;
    text-align: center;
  }

  li: hover {
    cursor: pointer;
    text-decoration: underline;
    background-color: #f5f6f8;
  }
`;

const EditBtn = styled.li``;

const DeleteBtn = styled.li``;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 20px;
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
  padding: 25px 20px 15px;
  font-size: 15px;
  line-height: 35px;
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
