import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper';
import '../CSS/room.css';
import { useEffect, useState } from 'react';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView, PhotoSlider } from 'react-photo-view';



const RoomPhoto = (props) => {
  const { imageUrl } = props.roomData;
  const [photo, setPhoto] = useState(false);
  const [open,setOpen]=useState(false)
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const judgePhoto = () => {
    if (imageUrl !== undefined) {
      setPhoto(true);
      
    }else{return}
  };
  useEffect(() => {
    judgePhoto();
  }, [judgePhoto]);

  const openPhoto=()=>{
    setOpen(true);
    setVisible(true);
  }
  return (
    <div className=" relative">
      {open && (
        <>

          <PhotoSlider
            images={imageUrl.map((item) => ({ src: item, key: item }))}
            visible={visible}
            onClose={() => setVisible(false)}
            index={index}
            onIndexChange={setIndex}
          />
        </>
      )}

      <div
        className=" absolute z-10 bg-gradient-to-t from-white h-full w-full"
        onClick={openPhoto}
      ></div>
      {photo && (
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
          className="mySwiper swiper2"
        >
          {imageUrl.map((item) => {
            return (
              <SwiperSlide className="swiper-slid2 ">
                <img src={item} alt="" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
};
export default RoomPhoto;
