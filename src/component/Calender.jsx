import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { addDays, subDays, eachWeekendOfInterval } from 'date-fns';

const Calender = (props) => {
  const {
    roomBooked,
    roomData,
    Id,
    setTotalDays,
    setIsWeekend,
    SetAlreadyBooked,
    alreadyBooked,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    chosenDays,
    setChosenDays,
    setCustomer,
    customer,
  } = props;

  const chosenDay = () => {
    try {
      roomBooked.forEach((item) => {
        let obj = { start: '', end: '' };
        let startDay = new Date(item.date[0]);
        let endDay = new Date(item.date[1]);
        obj.start = subDays(startDay, 1);
        obj.end = addDays(endDay, 0);

        setChosenDays((preDays) => [...preDays, obj]);
      });
    } catch (error) {}
  };

  useEffect(() => {
    chosenDay();
     checkSameDate(startDate, endDate);
  }, [roomBooked, roomData,startDate, endDate]);
  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('/');
  };


  const checkSameDate = async (startDay, endDay) => {
    let check=false;
    if(endDay==null){return}

    await roomBooked.forEach((item) => {
      let newEndDay = new Date(item.date[1]);
      newEndDay = new Date(newEndDay.setDate(newEndDay.getDate() - 1));
      let date0 = new Date(item.date[0]);
      let date1 = new Date(item.date[1]);
      

      let check1 =new Date(startDay) >= date0 && new Date(startDay) <= newEndDay;
      let check2 = new Date(endDay) >= date0 && new Date(endDay) <= date1;
      let check3 = date0 >= new Date(startDay) && date0 <= new Date(endDay);
      let check4 = date1 >= new Date(startDay) && date1 <= new Date(endDay);

      if (check == true) {
        return;
      } else if (check1 || check2 || check3 || check4) {
        SetAlreadyBooked(true);
        check=true
        return;
      } else {
        check=false;
        SetAlreadyBooked(false);
        return;
      }
    });
  };

  const onChange =async (dates) => {
    
    const [start, end] = dates;
     setStartDate(start);
     setEndDate(end);
   
    SetAlreadyBooked(false)
    await checkSameDate(startDate, endDate);
    setCustomer((preState) => {
      return {
        ...preState,
        date: [formatDate(dates[0]), formatDate(dates[1])],
      };
    });
    

    setTotalDays((end.getTime() - start.getTime()) / 1000 / 60 / 60 / 24);
    const result = eachWeekendOfInterval({
      start: new Date(formatDate(start)),
      end: new Date(formatDate(end)),
    });
    setIsWeekend(result.length);
  };

 
  const handleClick = () => {
    axios
      .post(`https://pure-harbor-20136.herokuapp.com/reserve/${Id}`, customer)
      .then((res) => {
        chosenDay();
        alert(res.data.message);

      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  return (
    <div className="ml-8 ">
      <h3 className=" text-primary mb-2">空房狀態查詢</h3>
      {/* <div>
        <div className="flex">
          <div className="w-32">
            <p>開始日期：</p>
          </div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className="flex">
          <div className="w-32">
            <p>結束日期：</p>
          </div>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
        <input
          type="text"
          placeholder="請輸入姓名"
          onChange={handleChange}
          name="name"
          value={customer.name}
        />
        <br />
        <input
          type="tel"
          placeholder="請輸入電話號碼"
          onChange={handleChange}
          name="tel"
          value={customer.tel}
        />

        <p>
          共{totalDays + 1}天{totalDays}夜，平日 {totalDays - isWeekend}{' '}
          晚，假日
          {isWeekend}晚
        </p>
        <h3 className="text-4xl">
          總價：
          {(totalDays - isWeekend) * roomData.normalDayPrice +
            isWeekend * roomData.holidayPrice}
        </h3>
        <input
          className="bg-blue-300 w-24 rounded-md mb-4 mt-4 cursor-pointer"
          type="submit"
          value=" 送出訂房"
          onClick={handleClick}
        />
      </div> */}
      <div>
        <DatePicker
          minDate={subDays(new Date(), 0)}
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          monthsShown={2}
          dateFormat="yyyy-MM-dd"
          selectsRange
          inline
          excludeDateIntervals={chosenDays}
        />
      </div>
    </div>
  );
};

export default Calender;
