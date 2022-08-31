import { ReactComponent as False } from "../images/false.svg";
import { ReactComponent as Success } from "../images/success.svg";
import { ReactComponent as Close } from '../images/icons8-close.svg';

const ReservePage=(props)=>{
    const { result, setBooking } = props;
    const closeClick=()=>{
        setBooking(false)
    }
    return (
      <div className=" relative w-10/12 m-auto mt-20 h-5/6  z-50 border bg-primary border-primary flex">
        <button className="absolute right-5 top-5" onClick={closeClick}>
          <Close className="h-5" />
        </button>
        <div className=" mx-auto text-white text-center w-96 mt-40">
          {result ? (
            <Success className="h-40  mx-auto" />
          ) : (
            <False className="h-40  mx-auto" />
          )}
          <div className=" text-center text-5xl mt-10 mb-10">
            {result ? <h3>預約成功</h3> : <h3>預約失敗</h3>}
          </div>
          {result ? (
            <p>
              請留意簡訊發送訂房通知，入住當日務必出示此訂房通知，
              若未收到簡訊請來電確認，謝謝您
            </p>
          ) : (
            <p>哎呀！晚了一步！您預約的日期已經被預約走了， 再看看其它房型吧</p>
          )}
        </div>
      </div>
    );
}

export default ReservePage;