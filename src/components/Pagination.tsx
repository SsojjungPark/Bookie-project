import styled from '@emotion/styled';
import Pagination from 'react-js-pagination';

interface PagingProps {
  page: number;
  itemsPerPage: number;
  count: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Paging = ({ page, itemsPerPage, count, setPage }: PagingProps) => {
  return (
    <PaginationWrapper>
      <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={itemsPerPage} // 한 페이지랑 보여줄 아이템 갯수
        totalItemsCount={count} // 총 아이템 갯수
        pageRangeDisplayed={5} // paginator의 페이지 범위
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={setPage} // 페이지 변경을 핸들링하는 함수
      />
    </PaginationWrapper>
  );
};

export default Paging;

const PaginationWrapper = styled.div`
  margin-top: 30px;

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3px;
  }

  ul.pagination li:first-of-type {
    border-radius: 5px 0 0 5px;
  }

  ul.pagination li:first-of-type a {
    font-size: 20px;
  }

  ul.pagination li:last-of-type {
    border-radius: 0 5px 5px 0;
  }

  ul.pagination li:last-of-type a {
    font-size: 20px;
  }

  ul.pagination li:nth-of-type(2) a {
    font-size: 20px;
  }

  ul.pagination li:nth-last-of-type(2) a {
    font-size: 20px;
  }

  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 15px;
  }

  ul.pagination li.active a {
    color: white;
    font-weight: 500;
  }

  ul.pagination li.active {
    background-color: var(--light-brown);
  }

  ul.pagination li a.active {
    color: blue;
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
`;
