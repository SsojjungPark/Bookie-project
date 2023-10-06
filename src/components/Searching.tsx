import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase-config';

interface allReviews {
  bookTitle: string;
  bookWriter: string;
  reviewTitle: string;
}

const Searching = () => {
  const { category } = useParams();
  const { id: reviewId } = useParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const [reviews, setReviews] = useState<allReviews[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [filteredReview, setFilteredReviews] = useState<allReviews[]>([]);
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);

  const onChageData = (e: React.FormEvent<HTMLInputElement>) => {
    const newKeyword = e.currentTarget.value;
    setKeyword(newKeyword);
    updateFilteredReviews(newKeyword);
  };

  const updateFilteredReviews = (searchKeyword: string) => {
    if (searchKeyword === '') {
      setFilteredReviews([]);
    } else {
      const filteredData = reviews.filter(
        (review) =>
          review.bookTitle.includes(searchKeyword) ||
          review.bookWriter.includes(searchKeyword) ||
          review.reviewTitle.includes(searchKeyword),
      );

      setFilteredReviews(filteredData);
    }
  };

  const handleInputFocus = () => {
    setShowSearchResult(true);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      setShowSearchResult(false);
    }
  };

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const allReviewData = [];
        const collectionNames = ['novel', 'humanities', 'sefImprovement'];

        for (const collectionName of collectionNames) {
          const querySnapshot = await getDocs(collection(db, collectionName));
          const collectionData: allReviews[] = querySnapshot.docs.map((doc) => ({
            bookTitle: doc.data().bookTitle,
            bookWriter: doc.data().bookWriter,
            reviewTitle: doc.data().reviewTitle,
          }));

          allReviewData.push(...collectionData);
        }

        setReviews(allReviewData);
        updateFilteredReviews(keyword);

        document.addEventListener('mousedown', handleOutsideClick);
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchReview();

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <SearchContaienr>
      <InputSearch
        type="text"
        ref={inputRef}
        value={keyword}
        placeholder="검색어를 입력해주세요."
        onChange={onChageData}
        onFocus={handleInputFocus}
      />
      <SearchIcon icon={faMagnifyingGlass} />

      {showSearchResult && (
        <AutoSearchCon>
          <AutoSearchUl>
            {filteredReview.map((review, index) => (
              <AutoSearchDataLi key={index}>
                <StyledLink to={`/${category}/${reviewId}`}>
                  {review.bookTitle} - {review.bookWriter} - {review.reviewTitle}
                </StyledLink>
              </AutoSearchDataLi>
            ))}
          </AutoSearchUl>
        </AutoSearchCon>
      )}
    </SearchContaienr>
  );
};

export default Searching;

const SearchContaienr = styled.div`
  position: relative;
  width: 230px;
  margin-right: 30px;
`;

const InputSearch = styled.input`
  width: 230px;
  height: 32px;
  padding: 0 25px 0 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid;
  font-size: 14px;
  color: var(--black-color);
  font-size: 14px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 13px;
    color: var(--signup-input);
  }
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 7px;
  right: 10px;
`;

const AutoSearchCon = styled.div`
  z-index: 3;
  width: 230px;
  height: 200px;
  background-color: var(--white-color);
  position: absolute;
  top: 32px;
  padding: 3px 0;
  border: 1px solid;
  overflow-y: scroll;
`;

const AutoSearchUl = styled.ul`
  width: 100%;
`;

const AutoSearchDataLi = styled.li`
  widht: 100%;
  margin-bottom: 3px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  display: inline-block;
  width: 100%;
  font-size: 13px;
  color: var(--black-color);
  padding: 10px 14px;
  box-sizing: border-box;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;

  &:hover {
    cursor: pointer;
    background-color: #f5f6f8;
  }
`;
