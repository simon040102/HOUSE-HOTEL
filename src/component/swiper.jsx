import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper';
import background1 from '../images/photo-1507149833265-60c372daea22.png';
import background2 from '../images/photo-1551516594-56cb78394645.png';
import background3 from '../images/photo-1549490148-d7304e934d25@2x.png';
import background4 from '../images/photo-1523217582562-09d0def993a6@2x.png';
import '../CSS/home.css';


const SwiperEffect = () => {
  return (
    <div>
      <div className="absolute w-full h-full z-10  bg-black opacity-30"></div>
      <Swiper
        speed={2000}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper swiper1 -z-10"
      >
        <SwiperSlide>
          <img src={background1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={background2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={background3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={background4} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default SwiperEffect;
