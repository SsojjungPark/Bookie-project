import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../config/firebase-config';

interface ReviewPostInfo {
  id: string;
  bookImg: string;
  bookTitle: string;
  bookWriter: string;
  reviewTitle: string;
  nickname: string;
  createdAt: string;
  likes: number;
  category: string;
}

const ReviewList = () => {
  const [reviews, setReviews] = useState<ReviewPostInfo[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewSnapshot = await getDocs(collection(db, 'boards'));
        const reviewData = reviewSnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
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
        console.log('reviewData fetch 성공');
      } catch (error) {
        console.log('reviewData fetch 실패: ', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <ReviewItemsUl>
      {reviews.map((review, index) => (
        <ReviewItemLi key={review.id}>
          <ReviewNumber>{index + 1}</ReviewNumber>

          <BookImage src={review.bookImg} alt={review.bookTitle} />

          <ReviewItemInfo>
            <BookInfo>
              <BookTitle>{review.bookTitle}</BookTitle>
              <BookWriter>({review.bookWriter})</BookWriter>
            </BookInfo>

            <ReviewInfo>
              <ReviewTitle>{review.reviewTitle}</ReviewTitle>
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
    </ReviewItemsUl>
  );
};

export default ReviewList;

const ReviewItemsUl = styled.ul`
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

const ReviewTitle = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 15px;

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
