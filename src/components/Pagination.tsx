import styled from '@emotion/styled';
import { useState } from 'react';
import Pagination from 'react-js-pagination';

const Paging = (page, count, setPages) => {
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={5} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={count} // 총 아이템 갯수
        pageRangeDisplayed={5} // paginator의 페이지 범위
        prevPageText={'‹'} // "이전"을 나타낼 텍스트
        nextPageText={'›'} // "다음"을 나타낼 텍스트
        onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
      />
    </>
  );
};

export default Paging;
