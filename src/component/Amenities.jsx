import { ReactComponent as No } from '../images/no.svg';
import { ReactComponent as Yes } from '../images/yes.svg';
import { ReactComponent as WiFi } from '../images/wifi.svg';
import { ReactComponent as AirCondition } from '../images/aircondition.svg';
import { ReactComponent as Bar } from '../images/bar.svg';
import { ReactComponent as Eat } from '../images/eat.svg';
import { ReactComponent as Game } from '../images/game.svg';
import { ReactComponent as HouseIcon } from '../images/houseIcon.svg';
import { ReactComponent as NoSmoking } from '../images/nosmoking.svg';
import { ReactComponent as Pet } from '../images/pet.svg';
import { ReactComponent as Ref } from '../images/ref.svg';
import { ReactComponent as Roomservice } from '../images/roomservice.svg';
import { ReactComponent as Sofa } from '../images/sofa.svg';
import { ReactComponent as Tel } from '../images/tel.svg';
import { ReactComponent as View } from '../images/view.svg';

const Amenities = (props) => {
  const { amenities } = props;
  return (
    <>
      <li
        className="mt-5 mr-12"
        style={
          ({ opacity: amenities.WiFi ? 1 : 0.3 },
          { height: amenities.WiFi ? 'auto' : 0.3 })
        }
      >
        <div className="h-8 mb-3 items-center relative w-auto">
          <div className=" absolute -right-5">
            {amenities.WiFi ? <Yes /> : <No />}
          </div>
          <WiFi />
        </div>
        <p className=" text-primary text-center text-xs">Wifi</p>
      </li>
      <li
        className="mt-5 mr-12"
        style={{ opacity: amenities.MiniBar ? 1 : 0.3 }}
      >
        <div className=" h-8 mb-3  relative w-auto flex justify-center">
          <div className=" absolute -right-5 ">
            {amenities.MiniBar ? <Yes /> : <No />}
          </div>
          <Bar />
        </div>
        <p className=" text-primary text-center text-xs">酒吧</p>
      </li>
      <li
        className="mt-5 mr-10"
        style={{ opacity: amenities.RoomService ? 1 : 0.3 }}
      >
        <div className=" h-8 mb-3 relative w-auto flex justify-center">
          <div className=" absolute  -right-5">
            {amenities.RoomService ? <Yes /> : <No />}
          </div>
          <Roomservice />
        </div>
        <p className=" text-primary text-center text-xs">客房服務</p>
      </li>
      <li
        className="mt-5 mr-12"
        style={{ opacity: amenities.ChildFriendly ? 1 : 0.3 }}
      >
        <div className=" h-8 mb-3 relative w-auto flex justify-center">
          <div className=" absolute  -right-4">
            {amenities.ChildFriendly ? <Yes /> : <No />}
          </div>
          <Game />
        </div>
        <p className=" text-primary text-center text-xs">適合兒童</p>
      </li>
      <li
        className="mt-5 mr-12"
        style={{ opacity: amenities.Television ? 1 : 0.3 }}
      >
        <div className=" h-8 mb-3 relative w-auto flex justify-center">
          <div className=" absolute  -right-5">
            {amenities.Television ? <Yes /> : <No />}
          </div>
          <Tel />
        </div>
        <p className=" text-primary text-center text-xs">電話</p>
      </li>
      <li
        className="mt-5 mr-12"
        style={{ opacity: amenities.GreatView ? 1 : 0.3 }}
      >
        <div className=" h-8 mb-3 relative w-auto flex justify-center">
          <div className=" absolute  -right-5">
            {amenities.GreatView ? <Yes /> : <No />}
          </div>
          <View />
        </div>
        <p className=" text-primary text-center text-xs">漂亮視野</p>
      </li>
      <li
        className="mt-5 mr-12"
        style={{ opacity: amenities.Refrigerator ? 1 : 0.3 }}
      >
        <div className=" h-8 mb-3 relative w-auto flex justify-center">
          <div className=" absolute  -right-6">
            {amenities.Refrigerator ? <Yes /> : <No />}
          </div>
          <Ref />
        </div>
        <p className=" text-primary text-center text-xs">冰箱</p>
      </li>
      <li className="mt-5 mr-12" style={{ opacity: amenities.Sofa ? 1 : 0.3 }}>
        <div className=" h-8 mb-3 relative w-auto flex justify-center">
          <div className=" absolute  -right-6">
            {amenities.Sofa ? <Yes /> : <No />}
          </div>
          <Sofa />
        </div>
        <p className=" text-primary text-center text-xs">沙發</p>
      </li>
      <li
        className="mt-5 mr-12"
        style={{ opacity: amenities.PetFriendly ? 1 : 0.3 }}
      >
        <div className=" h-8 mb-3 relative w-auto flex justify-center">
          <div className=" absolute  -right-6">
            {amenities.PetFriendly ? <Yes /> : <No />}
          </div>
          <Pet />
        </div>
        <p className=" text-primary text-center text-xs">寵物友善</p>
      </li>
      <li
        className="mt-5 mr-12"
        style={{ opacity: amenities.SmokeFree ? 1 : 0.3 }}
      >
        <div className=" h-8 mb-3 relative w-auto flex justify-center">
          <div className=" absolute  -right-6">
            {amenities.SmokeFree ? <Yes /> : <No />}
          </div>
          <NoSmoking />
        </div>
        <p className=" text-primary text-center text-xs">全面禁煙</p>
      </li>
      <li
        className="mt-5 mr-12"
        style={{ opacity: amenities.AirConditioner ? 1 : 0.3 }}
      >
        <div className=" h-8 mb-3 relative w-auto flex justify-center">
          <div className=" absolute  -right-6">
            {amenities.AirConditioner ? <Yes /> : <No />}
          </div>
          <AirCondition />
        </div>
        <p className=" text-primary text-center text-xs">空調</p>
      </li>
    </>
  );
};

export default Amenities;
