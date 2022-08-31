import Logo from '../images/houseIcon.svg';
const HomeInfo=()=>{


    return (
      <div className="pt-28  mr-24 z-30 w-3/12">
        <img className="mb-48" src={Logo} alt="" />
        <h1 className="leading-10 text-white">好室旅店。HOUSE HOTEL</h1>
        <ul className="font-thin text-white leading-8">
          <li>花蓮縣花蓮市國聯一路1號</li>
          <li>03-8321155</li>
          <li>HOUSE@HOTEL.COM</li>
        </ul>
      </div>
    );
}

export default HomeInfo