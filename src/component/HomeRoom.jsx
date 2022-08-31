import { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeRoom = (props) => {
  const { id, coverImages, index, name } = props;
  const [mouse, setMouse] = useState(false);
  const mouseIn = () => {
    setMouse(true);
  };
  const mouseOut = () => {
    setMouse(false);
  };
  return (
    <>
      <li
        key={index}
        onMouseMove={mouseIn}
        onMouseOut={mouseOut}
        className="relative"
      >
        {mouse && (
          <Link to={`/${id}`} className="w-full">
            <div className="absolute w-full h-full z-0 pt-32 bg-primary opacity-60">
              <div
                style={{ color: 'white' }}
                className="  z-10 font-extralight text-lg text-center break-normal  align-middle"
              >
                {name}
              </div>
            </div>
          </Link>
        )}
        <img className="object-cover  w-72 h-72 " src={coverImages} alt="" />
      </li>
    </>
  );
};

export default HomeRoom;
