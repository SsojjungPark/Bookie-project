import styled from '@emotion/styled';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AutoCarousel from '../components/Home/AutoCarousel';
import BestReviewCarousel from '../components/Home/BestReview';

const Home = () => {
  return (
    <Homecontainer>
      <Header />
      <div>
        <AutoCarousel />
        <BestReviewCarousel />
      </div>
      <Footer />
    </Homecontainer>
  );
};

export default Home;

const Homecontainer = styled.div``;
