import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ShowRoom from './component/showRoom';
import Calender from './component/Calender';
import RoomPhoto from './component/RoomPhoto';
import './CSS/room.css';
import backHome from './images/surface1@2x.png';
import BookRoom from './component/BookRoom';

const ReserveSingleRoom = () => {
  const navigate = useNavigate();
  const { Id } = useParams();
  const [roomData, setRoomData] = useState([]);
  const [roomBooked, setRoomBooked] = useState([]);
  const [alreadyBooked, SetAlreadyBooked] = useState(false);
  const getData = async () => {
    await axios
      .get(` https://pure-harbor-20136.herokuapp.com/singleroom/${Id}`)
      .then((res) => {
        setRoomData(res.data.room);
        setRoomBooked(res.data.booking);
      })
      .catch((err) => {
        alert('網址不存在');
        navigate('/');
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const [totalDays, setTotalDays] = useState(0);
  const [isWeekend, setIsWeekend] = useState(0);
  const [booking, setBooking] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [chosenDays, setChosenDays] = useState([]);
  const bookRoom = () => {
    setBooking(true);
  };
  const [customer, setCustomer] = useState({
    name: '',
    date: [],
    tel: '',
    roomId: Id,
  });
  return (
    <div className="relative">
      {booking && (
        <BookRoom
          Id={Id}
          setCustomer={setCustomer}
          customer={customer}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          chosenDays={chosenDays}
          setChosenDays={setChosenDays}
          setBooking={setBooking}
          totalDays={totalDays}
          isWeekend={isWeekend}
          roomData={roomData}
          setTotalDays={setTotalDays}
          setIsWeekend={setIsWeekend}
          SetAlreadyBooked={SetAlreadyBooked}
          alreadyBooked={alreadyBooked}
          roomBooked={roomBooked}
        />
      )}

      <div className="flex max-w-screen-2xl">
        <div className="relative h-screen sticky top-0">
          <Link
            className=" absolute z-20 text-primary top-20 left-36 drop-shadow-2xl"
            to="/"
          >
            <img src={backHome} className="inline w-2 mr-3" alt="" />
            查看其他房型
          </Link>
          <div className="absolute text-primary z-20 left-32 bottom-72">
            {alreadyBooked ? (
              <div className=" text-red">
                <h3 className="text-3xl font-normal text-left mb-2">
                  所選日期已被預訂
                </h3>
              </div>
            ) : (
              <div>
                <h3 className="text-5xl font-light text-center mb-2">
                  ＄{totalDays==0? roomData.normalDayPrice:(totalDays - isWeekend) * roomData.normalDayPrice +
                    isWeekend * roomData.holidayPrice}
               
                </h3>
                <p className=" text-xs text-center mb-10">
                  共{totalDays + 1}天{totalDays}夜，平日 {totalDays - isWeekend}{' '}
                  晚，假日
                  {isWeekend}晚
                </p>
                <div className=" bg-primary text-xl h-12 text-white text-center">
                  {' '}
                  <button onClick={bookRoom} className=" w-72 h-full">
                    Booking now
                  </button>
                </div>
              </div>
            )}
          </div>
          <RoomPhoto roomData={roomData} />
        </div>
        <div className="w-full ml-9">
          <ShowRoom roomData={roomData} roomBooked={roomBooked} />
          <Calender
            roomBooked={roomBooked}
            roomData={roomData}
            Id={Id}
            setTotalDays={setTotalDays}
            setIsWeekend={setIsWeekend}
            SetAlreadyBooked={SetAlreadyBooked}
            alreadyBooked={alreadyBooked}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            chosenDays={chosenDays}
            setChosenDays={setChosenDays}
            setCustomer={setCustomer}
            customer={customer}
          />
        </div>
      </div>
    </div>
  );
};
export default ReserveSingleRoom;

         
