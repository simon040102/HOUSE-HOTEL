import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SwiperEffect from './component/swiper';
import HomeInfo from './component/HomeInfo';
import HomeRoom from './component/HomeRoom';


const Home = () => {
  const [data, setData] = useState([]);
  const getData = () => {
    axios
      .get(' https://pure-harbor-20136.herokuapp.com/singleroom')
      .then((res) => {
        setData([...res.data.room]);
      });
  };
  const show = () => {
    return data.map((item, index) => {
      return <HomeRoom id={item._id} coverImages={item.coverImages} index={index} name={item.name}/>;
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <SwiperEffect />
      <div className="flex container m-auto">
        <HomeInfo />
        <div className="z-30">
          <ul className=" mt-32   grid grid-rows-2 grid-flow-col gap-y-0 ">
            {show()}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
