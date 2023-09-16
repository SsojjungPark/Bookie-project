import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fullStar, faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';

const ReviewList = () => {
  return (
    <ReviewItemsUl>
      <ReviewItemLi>
        <BookImage
          src="https://contents.kyobobook.co.kr/sih/fit-in/300x0/pdt/9788958075226.jpg"
          alt="책"
          width="150px"
        />

        <ReviewItemInfo>
          <BookInfo>
            <BookTitle>책 제목</BookTitle>
            <BookWriter>(저자)</BookWriter>
          </BookInfo>

          <ReviewInfo>
            <ReviewTitle>리뷰 제목</ReviewTitle>
            <NicknameDateWrapper>
              <Nickname>닉네임</Nickname>
              <Date>작성일</Date>
            </NicknameDateWrapper>
          </ReviewInfo>

          <LikeBookmarkWrapper>
            <LikeArea>
              <LikeIcon icon={faHeart} />
              <LikedIcon icon={fullHeart} />
              <LikesNumber>0</LikesNumber>
            </LikeArea>

            <BookmarkIcon icon={faStar} />
            <BookmarkedIcon icon={fullStar} />
          </LikeBookmarkWrapper>
        </ReviewItemInfo>
      </ReviewItemLi>
    </ReviewItemsUl>
  );

  return;
};

export default ReviewList;

const ReviewItemsUl = styled.ul`
  width: 100%;
  border-top: 1px solid var(--signup-input);
`;

const ReviewItemLi = styled.li`
  height: 310px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid var(--signup-input);
`;

const BookImage = styled.img`
  margin-right: 70px;
`;

const ReviewItemInfo = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BookInfo = styled.div`
  display: flex;
  font-size: 16px;
`;

const BookTitle = styled.div`
  margin-right: 5px;
`;

const BookWriter = styled.div``;

const ReviewInfo = styled.div``;

const ReviewTitle = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 12px;

  &: hover {
    cursor: pointer;
  }
`;

const NicknameDateWrapper = styled.div`
  display: flex;
  font-size: 15px;
  color: var(--dark-gray);
`;

const Nickname = styled.div`
  margin-right: 8px;
`;

const Date = styled.div``;

const LikeBookmarkWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LikeArea = styled.div`
  margin-right: 15px;
  display: flex;
  align-items: center;
`;

const LikeIcon = styled(FontAwesomeIcon)`
  color: var(--red-color);
  font-size: 18px;
`;

const LikedIcon = styled(FontAwesomeIcon)`
  color: var(--red-color);
  font-size: 18px;
`;

const LikesNumber = styled.span`
  margin-left: 5px;
  font-size: 15px;
`;

const BookmarkIcon = styled(FontAwesomeIcon)`
  font-size: 16px;
`;

const BookmarkedIcon = styled(FontAwesomeIcon)`
  font-size: 16px;
`;
