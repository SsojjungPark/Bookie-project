import styled from '@emotion/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Paging from '../components/Pagination';

interface ReviewPostInfo {
  reviewId: string;
  bookImg: string;
  bookTitle: string;
  bookWriter: string;
  reviewTitle: string;
  nickname: string;
  createdAt: string;
  likes: number;
  category: string;
}

const Humanities = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [reviews, setReviews] = useState<ReviewPostInfo[]>([]);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(1);
  const reviewPerPage = 5;
  const totalreview = reviews.length;
  const indexOfLastReview = currentPage * reviewPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewPerPage;
  const reviewsToDisplay = reviews.slice(indexOfFirstReview, indexOfLastReview);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewSnapshot = await getDocs(collection(db, 'humanities'));
        const reviewData = reviewSnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            reviewId: doc.id,
            bookImg: data.bookImg,
            bookTitle: data.bookTitle,
            bookWriter: data.bookWriter,
            reviewTitle: data.reviewTitle,
            nickname: data.nickname,
            createdAt: data.createdAt,
            likes: data.likes,
            category: data.category,
          };
        });

        // 최근 날짜순으로 정렬
        reviewData.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

        setReviews(reviewData);
      } catch (error) {
        console.log('reviewData fetch 실패: ', error);
      }
    };

    fetchReviews();
  }, []);

  const handleWriteBtnClick = () => {
    if (currentUser) {
      navigate('/writeReview');
    } else {
      alert('리뷰를 작성하려면 로그인이 필요합니다.');

      window.location.href = '/humanities';
    }
  };

  return (
    <ReviewContainer>
      <Header />

      <ReviewWrapper>
        <Title>인문</Title>
        <ReviewListUl>
          {reviewsToDisplay.map((review, index) => (
            <ReviewItemLi key={review.reviewId}>
              <ReviewNumber>{(currentPage - 1) * reviewPerPage + index + 1}</ReviewNumber>

              <BookImage src={review.bookImg} alt={review.bookTitle} />

              <ReviewItemInfo>
                <BookInfo>
                  <BookTitle>{review.bookTitle}</BookTitle>
                  <BookWriter>({review.bookWriter})</BookWriter>
                </BookInfo>

                <ReviewInfo>
                  <ReviewTitleLink to={`/${review.category}/${review.reviewId}`}>{review.reviewTitle}</ReviewTitleLink>
                  <NicknameDateWrapper>
                    <Nickname>{review.nickname}</Nickname>
                    <Date>{review.createdAt}</Date>
                  </NicknameDateWrapper>
                </ReviewInfo>

                <LikeArea>
                  <LikeIcon icon={fullHeart} />
                  <LikesNumber>{review.likes}</LikesNumber>
                </LikeArea>
              </ReviewItemInfo>
            </ReviewItemLi>
          ))}
        </ReviewListUl>

        <Paging page={currentPage} count={totalreview} itemsPerPage={reviewPerPage} setPage={setCurrentPage} />

        <WriteBtnLink to="/writeReview" onClick={handleWriteBtnClick}>
          <WriteIcon icon={faPen} />
          글쓰기
        </WriteBtnLink>
      </ReviewWrapper>

      <Footer />
    </ReviewContainer>
  );
};

export default Humanities;

const ReviewContainer = styled.div`
  background-color: var(--white-color;);x
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

const ReviewListUl = styled.ul`
  width: 100%;
  border-top: 1px solid var(--signup-input);
`;

const ReviewItemLi = styled.li`
  height: 280px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  border-bottom: 1px solid var(--signup-input);
`;

const ReviewNumber = styled.div`
  margin-right: 50px;
  font-weight: 500;
  font-size: 15px;
  color: var(--black-color);
`;

const BookImage = styled.img`
  width: 150px;
  height: 200px;
  object-fit: fill;
  margin-right: 70px;
`;

const ReviewItemInfo = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookInfo = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 16px;
`;

const BookTitle = styled.div`
  margin-right: 3px;
`;

const BookWriter = styled.div``;

const ReviewInfo = styled.div``;

const ReviewTitleLink = styled(Link)`
  display: block;
  text-decoration: none;
  font-weight: 700;
  font-size: 20px;
  color: var(--black-color);
  margin-bottom: 12px;

  &: hover {
    cursor: pointer;
  }
`;

const NicknameDateWrapper = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 14px;
  color: var(--dark-gray);
`;

const Nickname = styled.div`
  margin-right: 15px;
`;

const Date = styled.div``;

const LikeArea = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  display: flex;
  align-items: center;
`;

const LikeIcon = styled(FontAwesomeIcon)`
  color: var(--red-color);
  font-size: 17px;
`;

const LikesNumber = styled.span`
  margin-left: 5px;
  font-size: 15px;
`;

const WriteBtnLink = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  float: right;
  margin-top: 40px;
  width: 85px;
  height: 38px;
  font-size: 14px;
  background-color: #f5f5f5;
  border: 1px solid var(--signup-input);
  border-radius: var(--border-radius);
  color: var(--blacl-color);

  &:hover {
    cursor: pointer;
  }
`;

const WriteIcon = styled(FontAwesomeIcon)`
  font-size: 14px;
  margin-right: 5px;
`;
