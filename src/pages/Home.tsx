import styled from '@emotion/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AutoCarousel from '../components/Home/AutoCarousel';

const Home = () => {
  return (
    <Homecontainer>
      <Header />

      <AutoCarousel />

      <div>
        <div>베스트</div>
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
