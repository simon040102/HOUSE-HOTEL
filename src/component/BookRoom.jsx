import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addDays, subDays, eachWeekendOfInterval } from 'date-fns';
import { ReactComponent as Close } from '../images/close.svg';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import ReservePage from './ReservePage';
import Amenities from './Amenities';
import book1 from '../images/book1.png'
import book2 from '../images/book2.png'
import book3 from '../images/book3.png'
import bookarr from '../images/bookarr.png'

const BookRoom = (props) => {
  const MySwal = withReactContent(Swal);
  const {
    Id,
    setCustomer,
    customer,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    chosenDays,
    setBooking,
    totalDays,
    isWeekend,
    roomData,
    setTotalDays,
    setIsWeekend,
    SetAlreadyBooked,
    alreadyBooked,
    roomBooked,
  } = props;
   const {
     normalDayPrice,
     holidayPrice,
     descriptionShort,
     amenities,
   } = props.roomData;
  const [reservePage, setReservePage] = useState(true);
  const [result, setResult] = useState(false);
  const closeView = () => {
    setBooking(false);
  };
  const dateChange = async () => {
    try {
        let newEndDay = new Date(endDate);
        newEndDay = new Date(newEndDay.setDate(newEndDay.getDate() - 1));
      setCustomer((preState) => {
        return {
          ...preState,
          date: [formatDate(startDate), formatDate(newEndDay)],
        };
      });
      setTotalDays(
        (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24
      );
      const result = eachWeekendOfInterval({
        start: new Date(formatDate(startDate)),
        end: new Date(formatDate(endDate)),
      });
      setIsWeekend(result.length);
      console.log(alreadyBooked);
      if (alreadyBooked == true) {
        Swal.fire('所選日期已被預訂');
        setStartDate(new Date());
        setEndDate(new Date());
      }
    } catch (error) {}
  };
  useEffect(() => {
    dateChange();
    checkSameDate(startDate, endDate);
  }, [startDate, endDate, alreadyBooked]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((preState) => {
      return {
        ...preState,
        [name]: value,
      };
    });
  };
  const checkSameDate = async (startDay, endDay) => {
    let check = false;
    if (endDay == null) {
      return;
    }

    await roomBooked.forEach((item) => {
      let newEndDay = new Date(item.date[1]);
      newEndDay = new Date(newEndDay.setDate(newEndDay.getDate() - 1));
      let date0 = new Date(item.date[0]);
      let date1 = new Date(item.date[1]);

      let check1 =
        new Date(startDay) >= date0 && new Date(startDay) <= newEndDay;
      let check2 = new Date(endDay) >= date0 && new Date(endDay) <= date1;
      let check3 = date0 >= new Date(startDay) && date0 <= new Date(endDay);
      let check4 = date1 >= new Date(startDay) && date1 <= new Date(endDay);

      if (check == true) {
        return;
      } else if (check1 || check2 || check3 || check4) {
        SetAlreadyBooked(true);
        check = true;
        return;
      } else {
        check = false;
        SetAlreadyBooked(false);
        return;
      }
    });
  };
  const reserve = () => {
    let regex = /^1[34578]\d{9}$/;
    console.log(!regex.test(customer.tel));
    if (customer.name == '') {
      Swal.fire('請輸入姓名');
      return;
    } else if (customer.tel == '') {
      Swal.fire('請輸入電話號碼');
      return;
    }
    axios
      .post(`https://pure-harbor-20136.herokuapp.com/reserve/${Id}`, customer)
      .then((res) => {
        console.log(res);
        setReservePage(false);
        setResult(true);
      })
      .catch((err) => {
        setResult(false);
        setReservePage(false);
      });
  };
  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };
  console.log(roomData);
  return (
    <div className="absolute z-40 w-full h-screen">
      {reservePage ? (
        <div className="  w-10/12 m-auto mt-20 h-6/6  z-50 border border-primary flex">
          <div className=" w-5/12 bg-primary">
            <div className=" w-8/12 m-auto pt-12">
              <p className=" text-white">姓名</p>
              <input
                className=" w-full mb-4 h-8 indent-4"
                type="text"
                onChange={handleChange}
                name="name"
                value={customer.name}
              />
              <br />
              <p className=" text-white">電話</p>
              <input
                className=" w-full mb-4 h-8 indent-4"
                type="tel"
                onChange={handleChange}
                name="tel"
                value={customer.tel}
              />
              <br />
              <p className=" text-white">入住日期</p>
              <DatePicker
                className=" w-full mb-4 h-8 indent-4"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setEndDate(date);
                  dateChange();
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                excludeDateIntervals={chosenDays}
                dateFormat="yyyy-MM-dd"
                monthsShown={2}
                minDate={subDays(new Date(), 0)}
              />
              <br />
              <p className=" text-white">退房日期</p>
              <DatePicker
                className=" w-full  h-8 indent-4"
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  dateChange();
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={subDays(new Date(), 0)}
                excludeDateIntervals={chosenDays}
                dateFormat="yyyy-MM-dd"
                monthsShown={2}
              />
              {totalDays > 0 && (
                <>
                  <p className=" text-xs text-secondary mb-3 leading-10 border-b border-secondary">
                    共{totalDays + 1}天{totalDays}夜，平日{' '}
                    {totalDays - isWeekend} 晚，假日
                    {isWeekend}晚
                  </p>
                  <div className=" text-right tracking-widest text-white">
                    <p className="text-xl">總計</p>
                    <h3 className="text-4xl font-normal mb-2 ">
                      ＄
                      {(totalDays - isWeekend) * roomData.normalDayPrice +
                        isWeekend * roomData.holidayPrice}
                    </h3>
                  </div>
                </>
              )}

              <div className=" bg-primary text-xl h-12 text-white text-center"></div>
              <div className=" bg-primary mb-5 text-2xl border w-full h-full p-2 text-white text-center">
                <button
                  className=" w-full"
                  type="button"
                  disabled={totalDays < 0}
                  onClick={reserve}
                >
                  確認送出
                </button>
              </div>
              <p className="text-xs text-center text-white">
                此預約系統僅預約功能，並不會對您進行收費
              </p>
            </div>
          </div>
          <div className=" relative w-8/12 pt-10 px-7 bg-white">
            <button className="absolute right-5 top-5" onClick={closeView}>
              <Close />
            </button>
            <div className="w-full mb-6">
              <div className="flex relative w-full">
                <h2 className="text-bolder text-primary mb-2 text-2xl ">
                  {roomData.name}
                </h2>
                <div className="before:absolute before:content-[''] before:h-0.5 before:w-7/12 before:ml-2 before:bg-secondary before:top-4 mr"></div>
              </div>
              <p className="text-md  text-primary  mb-1">
                {descriptionShort.GuestMax}人 ，{descriptionShort.Bed.length}
                {descriptionShort.Bed[0]} 床，附早餐 ，衛浴
                {descriptionShort.PrivateBath} 間，
                {descriptionShort.Footage}平方公尺
              </p>
              <p>
                平日（一～四）價格：{normalDayPrice} / 假日（五〜日）價格：
                {holidayPrice}
              </p>
              <ul className="flex flex-wrap container mb-4">
                <Amenities amenities={amenities} className="" />
              </ul>
              <div className="flex relative w-full">
                <h2 className="text-bold text-primary mb-2 text-xl ">
                  訂房資訊
                </h2>
                <div className="before:absolute before:content-[''] before:h-0.5 before:w-9/12 before:ml-2 before:bg-secondary before:top-3 mr"></div>
              </div>
              <ul className=" list-disc ml-3 text-primary mb-5">
                <li>
                  入住時間：最早15：00，最晚21：00；退房時間：10：00，請自行確認行程安排。
                </li>
                <li>平日定義週一至週四；假日定義週五至週日及國定假日。</li>
                <li>好室旅店全面禁止吸菸。</li>
                <li>
                  {' '}
                  若您有任何問題，歡迎撥打 03-8321155 ( 服務時間 週一至週六10:00
                  - 18:00 )。
                </li>
              </ul>
              <div className="flex relative w-full">
                <h2 className="text-bold text-primary mb-2 text-xl ">
                  預約流程
                </h2>
                <div className="before:absolute before:content-[''] before:h-0.5 before:w-9/12 before:ml-2 before:bg-secondary before:top-3 mr"></div>
              </div>
              <div className="flex">
                <div className="w-40 h-36 border rounded-b-lg border-secondary">
                  <div>
                    <div className="h-12 w-40 bg-secondary pt-2">
                      <img className="w-8 mx-auto" src={book1} alt="" />
                    </div>
                    <div className="px-2 mt-3 text-primary text-center">
                      <p>送出線上預約單</p>
                    </div>
                  </div>
                </div>
                <div className="mx-4 mt-2">
                  <img className="h-5" src={bookarr} alt="" />
                </div>
                <div className="w-40 h-36 border rounded-b-lg border-secondary">
                  <div>
                    <div className="h-12 w-40 bg-secondary pt-2">
                      <img className="w-8 mx-auto" src={book2} alt="" />
                    </div>
                    <div className="px-2 mt-3 text-primary text-center">
                      <p>
                        系統立即回覆是否預訂成功 並以簡訊發送訂房通知
                        (若未收到簡訊請來電確認)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mx-4 mt-2">
                  <img className="h-5" src={bookarr} alt="" />
                </div>
                <div className="w-40 h-36 border rounded-b-lg border-secondary">
                  <div>
                    <div className="h-12 w-40 bg-secondary pt-2">
                      <img className="w-8 mx-auto" src={book3} alt="" />
                    </div>
                    <div className="px-2 mt-3 text-primary text-center">
                      <p>
                        入住當日憑訂房通知 以現金或刷卡付款即可
                        (僅接受VISA.JCB.銀聯卡)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ReservePage result={result} setBooking={setBooking} />
      )}
    </div>
  );
};

export default BookRoom;
