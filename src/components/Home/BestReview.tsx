import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';
import { db } from '../../config/firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const BestReviewCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const boardsCollection = collection(db, 'boards');
        const querySnapshot = await getDocs(boardsCollection);
      } catch (error) {
        console.log('fetchBoards 실페: ', error);
      }
    };
  }, []);

  return (
    <BestReviewWrapper>
      <BestReivewContaienr>
        <BestReviewTitle>베스트 리뷰 10</BestReviewTitle>
        <Slider {...settings}>
          <div>
            <BookImage src="" alt="" />
            <div>
              <div>
                <span>리뷰 제목</span>
                <span>닉네임</span>
              </div>
              <span>리뷰 제목</span>
            </div>
          </div>
          <div>slide2</div>
          <div>slide3</div>
          <div>slide3</div>
          <div>slide3</div>
        </Slider>
      </BestReivewContaienr>
    </BestReviewWrapper>
  );
};

export default BestReviewCarousel;

const BestReviewWrapper = styled.div`
  border: 1px solid red;
`;

const BestReivewContaienr = styled.div`
  margin: 0 auto;
  margin-top: 55px;
  width: 1200px;
  background-color: var(--white-color);
  border: 1px solid blue;
`;

const BestReviewTitle = styled.div`
  margin-bottom: 40px;
  font-weight: 600;
  font-size: 25px;
`;

const BookImage = styled.img`
  width: 180px;
  height: 220px;
  border: 1px solid red;
`;
