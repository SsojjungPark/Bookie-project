import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase-config';

const Header = () => {
  const { currentUser } = useAuth();

  // 로그아웃
  const handleLogout = async () => {
    try {
      if (currentUser) {
        await signOut(auth);
      }
    } catch (error) {
      console.log('로그아웃 실패: ', error);
    }
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <StyledLink to="/">
          <Logo>Bookie</Logo>
        </StyledLink>

        <Nav>
          <CategoriesUl>
            <Category>
              <StyledLink to="/novel">소설</StyledLink>
            </Category>
            <Category>
              <StyledLink to="/humanities">인문</StyledLink>
            </Category>
            <Category>
              <StyledLink to="/selfImprovement">자기계발</StyledLink>
            </Category>
            <Category>
              <StyledLink to="/economicSociety">경제/사회</StyledLink>
            </Category>
          </CategoriesUl>
        </Nav>

        <HeaderRight>
          <SearchContaienr>
            <InputSearch type="text" placeholder="검색어를 입력해주세요." />
            <SearchIcon icon={faMagnifyingGlass} />
          </SearchContaienr>
          {currentUser ? (
            <AfterLoginArea>
              <ProfileImg
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="프로필사진"
                width="32px"
                height="32px"
              />
              <Logout onClick={handleLogout}>로그아웃</Logout>
            </AfterLoginArea>
          ) : (
            <GoToWrapper>
              <LinkLogin to="/login">로그인</LinkLogin>
              <LinkSingup to="/signup">회원가입</LinkSingup>
            </GoToWrapper>
          )}
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--black-color);
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
  align-items: center;
  color: var(--black-color);
`;

const linkStyles = {
  textDecoration: 'none',
  color: 'var(--black-color)',
  fontSize: '15px',

  '&:hover': {
    cursor: 'pointer',
    fontWeight: '500',
  },
};

const LinkLogin = styled(Link)(linkStyles, { marginRight: '12px' });

const LinkSingup = styled(Link)(linkStyles);

const AfterLoginArea = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  border-radius: 50%;

  &:hover {
    cursor: pointer;
  }
`;

const Logout = styled.div`
  margin-left: 20px;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    font-weight: 500;
  }
`;
