import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Logo>Bookie</Logo>

        <Nav>
          <CategoriesUl>
            <Category>소설</Category>
            <Category>인문</Category>
            <Category>자기계발</Category>
            <Category>경제/사회</Category>
          </CategoriesUl>
        </Nav>

        <HeaderRight>
          <SearchContaienr>
            <InputSearch type="text" placeholder="검색어를 입력해주세요." />
            <SearchIcon icon={faMagnifyingGlass} />
          </SearchContaienr>

          <GoToWrapper>
            <GoToLogin>로그인</GoToLogin>
            <GoToSignup>회원가입</GoToSignup>
          </GoToWrapper>
        </HeaderRight>
      </HeaderWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: fixed;
  width: 100%;
  height: 90px;
  background-color: var(--light-yellow);
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.25);
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 1200px;
  height: 90px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  font-weight: 600;
  font-size: 40px;
  color: var(--logo-color);
  font-family: 'Lucida Bright Demibold V1';

  &:hover {
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  margin-left: 100px;
`;

const CategoriesUl = styled.ul`
  width: 350px;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 18px;
  color: var(--black-color);
`;

const Category = styled.li`
  line-height: 30px;
  font-size: 18px;

  &:hover {
    cursor: pointer;
    border-bottom: 3px solid var(--logo-color);
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

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

const GoToWrapper = styled.div`
  color: var(--black-color);

  span {
    font-size: 15px;
  }

  span: hover {
    font-weight: 500;
    cursor: pointer;
  }
`;

const GoToLogin = styled.span`
  margin-right: 12px;
`;

const GoToSignup = styled.span``;
