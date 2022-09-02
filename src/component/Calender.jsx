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
    setChosenDays([]);
    console.log(startDate, endDate);
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
      let newStartDay = new Date(item.date[0]);
      let newEndDay = new Date(item.date[1]);
      newStartDay = new Date(newStartDay.setDate(newStartDay.getDate() + 1));
      newEndDay = new Date(newEndDay.setDate(newEndDay.getDate() - 1));
      let date0 = new Date(item.date[0]);
      let date1 = new Date(item.date[1]);
      

      let check1 =new Date(startDay) >= date0 && new Date(startDay) <= newEndDay;
      let check2 = new Date(endDay) >= date0 && new Date(endDay) <= date1;
      let check3 = date0 >= new Date(newStartDay) && date0 <= new Date(endDay);
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


  return (
    <div className="ml-8 ">
      <h3 className=" text-primary mb-2">空房狀態查詢</h3>

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
