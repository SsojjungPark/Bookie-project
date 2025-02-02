import styled from '@emotion/styled';
import Header from '../components/Header';
import Comment from '../components/comment/Comment';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCommentDots } from '@fortawesome/free-regular-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, collection, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
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
  const navigate = useNavigate();

  const [review, setReview] = useState<ReviewDatasType | null>(null);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [visibleBtns, setVisibleBtns] = useState<boolean>(false);
  const [likeBtn, setLikeBtn] = useState<boolean>(false);

  const handleCommentCountChange = (count: number) => {
    setCommentCount(count);
  };

  // 수정, 삭제 버튼 토글
  const isCurrentUserReview = currentUser?.uid === review?.uid;
  const handleToggleDotsBtnClick = () => {
    setVisibleBtns(!visibleBtns);
  };

  const handleDeleteBtn = async () => {
    const confirmDelete = window.confirm('게시물을 삭제하시겠습니까?');

    if (confirmDelete) {
      const reviewDocRef = doc(db, `${category}`, `${reviewId}`);
      try {
        await deleteDoc(reviewDocRef);
        console.log('게시물이 삭제되었습니다.');

        navigate(`/${category}`);
      } catch (error) {
        console.log('게시물 삭제 중 오류 발생: ', error);
      }
    }
  };

  // 좋아요 업데이트
  const updateLikes = async (newLike: number) => {
    const reviewDocRef = doc(db, `${category}`, `${reviewId}`);

    try {
      await updateDoc(reviewDocRef, { likes: newLike });
      console.log('좋아요 +1 업데이트 성공');
    } catch (error) {
      console.log('좋아요 업데이트 실패: ', error);
    }
  };

  const handleLikeClick = async () => {
    if (currentUser) {
      if (likeBtn) {
        // 이미 좋아요를 누른 상태인 경우, 좋아요 취소 로직
        setLikeBtn(false);

        // firestore의 likes 필드 -1
        if (review && review.likes > 0) {
          const newLikes = review.likes - 1;
          await updateLikes(newLikes);

          // 화면에 숫자 바로 업데이트
          setReview((prevReview) => {
            if (prevReview) {
              return {
                ...prevReview,
                likes: newLikes,
              };
            }

            return prevReview;
          });
        }
      } else {
        // 좋아요를 누르지 않은 상태인 경우, 좋아요 로직 추가
        setLikeBtn(true);

        // firestore의 likes 필드 +1
        if (review) {
          const newLikes = review.likes + 1;
          await updateLikes(newLikes);

          setReview((prevReview) => {
            if (prevReview) {
              return {
                ...prevReview,
                likes: newLikes,
              };
            }

            return prevReview;
          });
        }
      }
    } else {
      alert('로그인한 사용자만 좋아요를 누를 수 있습니다.');
    }
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

                {isCurrentUserReview && (
                  <BtnsContainer>
                    <DotsIconWrapper onClick={handleToggleDotsBtnClick}>
                      <DotsIcon icon={faEllipsisVertical} />
                    </DotsIconWrapper>
                    {visibleBtns && (
                      <BtnsWrapperUl>
                        <EditBtn>수정</EditBtn>
                        <DeleteBtn onClick={handleDeleteBtn}>삭제</DeleteBtn>
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
            {currentUser ? (
              <LikeArea>
                {likeBtn ? (
                  <LikedIcon icon={fullHeart} onClick={handleLikeClick} />
                ) : (
                  <LikeIcon icon={faHeart} onClick={handleLikeClick} />
                )}
                좋아요
                <span>{review?.likes}</span>
              </LikeArea>
            ) : (
              <LikeArea>
                <LikedIcon icon={fullHeart} />
                좋아요
                <span>{review?.likes}</span>
              </LikeArea>
            )}
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
