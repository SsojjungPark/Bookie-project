import styled from '@emotion/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <Homecontainer>
      <Header />

      <div>자동 캐러셀</div>

      <div>
        <div>베스트</div>
        <ul>
          <li></li>
        </ul>
      </div>

      <div>
        <div>신간 소개</div>
        <ul>
          <li></li>
        </ul>
      </div>

      <Footer />
    </Homecontainer>
  );
};

export default Home;

const Homecontainer = styled.div``;
