import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const AutoCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
      <Prev>
        <PrevArrow icon={faChevronLeft} />
      </Prev>
    ),
    nextArrow: (
      <Next>
        <NextArrow icon={faChevronRight} />
      </Next>
    ),
  };

  return (
    <AutoCarouselContainer>
      <StyledSlider {...settings}>
        <StyledLink to="https://korearf.kpipa.or.kr/uss/ion/evt/EgovEventMainEvent.do" target="_blank">
          <CarouselImage
            src="https://korearf.kpipa.or.kr/cmm/fms/getImage.do?atchFileId=FILE_000000000006171"
            alt="2023 제 10회 대한민국 독서대전 고양"
          />
        </StyledLink>
        <StyledLink
          to="https://jdlib.sen.go.kr/jdlib/board/view.do?menu_idx=25&manage_idx=1039&board_idx=1561667"
          target="_blanck"
        >
          <CarouselImage
            src="https://jdlib.sen.go.kr/data/popupZone/h22/202309271511_02iVADN.jpg"
            alt="책 교환 플리마켓"
          />
        </StyledLink>
        <StyledLink to="https://openlib.seoul.kr/" target="_blanck">
          <CarouselImage src="https://lib.seoul.go.kr/apload/webbanner/20230911.jpg" alt="책읽는 서울광장" />
        </StyledLink>
      </StyledSlider>
    </AutoCarouselContainer>
  );
};

export default AutoCarousel;

const AutoCarouselContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 500px;
`;

const StyledSlider = styled(Slider)`
  position: relative;
  width: 100%;
  height: 500px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);

  .slick-dots {
    position: absolute;
    bottom: 10px;
    display: block;
    width: 100%;
    list-style: none;
    text-align: center;
  }

  .slick-dots li {
    position: relative;
    list-style: none;
  }

  .slick-dots li button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background-color: rgba(209, 209, 209, 0.6);
  }

  .slick-dots li button:before {
    display: none;
  }

  .slick-dots li.slick-active button {
    opacity: 0.75;
    background-color: #2e2e2e;
  }

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  height: 500px;
`;

const CarouselImage = styled.img`
  display: block;
  width: 100%;
  height: 500px;
  object-fit: fill;
`;

const Prev = styled.div`
  left: 30px;
  width: 25px;
  height: 25px;

  z-index: 2;
`;

const arrow = `
  font-size: 25px;
  color: #d1d1d1;
  opacity: 0.5;

  &:hover {
    color: #2e2e2e
  }
`;

const PrevArrow = styled(FontAwesomeIcon)`
  ${arrow}
`;

const Next = styled.div`
  right: 30px;
  width: 25px;
  height: 25px;

  z-index: 2;
`;

const NextArrow = styled(FontAwesomeIcon)`
  ${arrow}
`;
