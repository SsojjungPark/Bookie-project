import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import { db } from '../../config/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface AllReviewData {
  bookImg: string;
  bookTitle: string;
  reviewTitle: string;
  reviewWriter: string;
  like: number;
  category: string;
  reviewId: string;
}

const BestReviewCarousel = () => {
  const [reviews, setReviews] = useState<AllReviewData[]>([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    prevArrow: (
      <Prev>
        <PrevArrow icon={faChevronLeft} />
      </Prev>
    ),
    nextArrow: (
      <Next>
        <NextArrow icon={faChevronRight} />
      </Next>
    ),
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const allReviewData = [];
        const collectionNames = ['novel', 'humanities', 'sefImprovement'];

        for (const collectionName of collectionNames) {
          const querySnapshot = await getDocs(collection(db, collectionName));
          const collectionData: AllReviewData[] = querySnapshot.docs.map((doc) => ({
            bookImg: doc.data().bookImg,
            bookTitle: doc.data().bookTitle,
            reviewTitle: doc.data().reviewTitle,
            reviewWriter: doc.data().nickname,
            like: doc.data().likes,
            category: doc.data().category,
            reviewId: doc.id,
          }));

          allReviewData.push(...collectionData);
        }

        const sortedByLikes = allReviewData.sort((a, b) => b.like - a.like);
        const top10Reviews = sortedByLikes.slice(0, 10);

        setReviews(top10Reviews);
      } catch (error) {
        console.log('Fetch Reviews 실패: ', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <BestReviewWrapper>
      <BestReivewContaienr>
        <BestReviewTitle>베스트 리뷰 10</BestReviewTitle>

        <CustomSlider {...settings}>
          {reviews.map((review, index) => (
            <StyledLink to={`/${review.category}/${review.reviewId}`} key={index + 1}>
              <BookImage src={review.bookImg} alt={review.bookTitle} />
              <BookReviewInfo>
                <BookTitle>{review.bookTitle}</BookTitle>
                <ReviewInfo>
                  <ReviewTitle>{review.reviewTitle}</ReviewTitle>
                  <ReviewWriter>{review.reviewWriter}</ReviewWriter>
                </ReviewInfo>
              </BookReviewInfo>
            </StyledLink>
          ))}
        </CustomSlider>
      </BestReivewContaienr>
    </BestReviewWrapper>
  );
};

export default BestReviewCarousel;

const BestReviewWrapper = styled.div``;

const BestReivewContaienr = styled.div`
  margin: 0 auto;
  margin-top: 55px;
  width: 1200px;
  background-color: var(--white-color);
`;

const BestReviewTitle = styled.div`
  margin-bottom: 40px;
  font-weight: 600;
  font-size: 25px;
`;

const CustomSlider = styled(Slider)`
  .slick-slide > div > a {
    display: flex !important;
    flex-direction: column;
    align-items: center;
    padding: 25px 0;
  }

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--black-color);
`;

const BookImage = styled.img`
  width: 160px;
  height: 210px;
`;

const BookReviewInfo = styled.div`
  width: 160px;
  font-size: 14px;
`;

const BookTitle = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-spcae: nowrap;
  margin: 20px 0 15px 0;
`;

const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewTitle = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 5px;
`;

const ReviewWriter = styled.div``;

const Prev = styled.div`
  width: 40px;
  height: 40px;
  left: -60px;
  border-radius: 50%;

  border: 1px solid #ccc;
`;

const arrow = `
  font-size: 16px;
  color: var(--black-color);
  opacity: 0.5;
`;

const PrevArrow = styled(FontAwesomeIcon)`
  ${arrow}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Next = styled.div`
  width: 40px;
  height: 40px;
  right: -60px;
  border-radius: 50%;
  border: 1px solid #ccc;
`;

const NextArrow = styled(FontAwesomeIcon)`
  ${arrow}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
