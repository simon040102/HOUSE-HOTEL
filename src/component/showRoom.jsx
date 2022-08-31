import Amenities from './Amenities'

const ShowRoom = (props) => {
  const {
    normalDayPrice,
    holidayPrice,
    descriptionShort,
    checkInAndOut,
    description,
    amenities,
    name
  } = props.roomData;
  try {
     let NewDescription = description.split('.');

    return (
      <div className="mt-12 ">
        <div className="ml-10 container">
          
            <h1 className="text-4xl mb-5  text-primary">{name}</h1>
            <h2 className="text-md font-bold text-primary float-right -mt-12 mr-20">
              {descriptionShort.GuestMax}人 ，{descriptionShort.Bed.length}
              {descriptionShort.Bed[0]} 床，附早餐 ，衛浴
              {descriptionShort.PrivateBath} 間，
              {descriptionShort.Footage}平方公尺
            </h2>
          
          <ul className=" text-primary leading-6 text-md mb-4">
            <li>
              <p>
                平日（一～四）價格：{normalDayPrice} / 假日（五〜日）價格：
                {holidayPrice}
              </p>
              <li>
                <p>
                  入住時間：{checkInAndOut.checkInEarly}（最早）/
                  {checkInAndOut.checkInLate}（最晚）
                </p>
              </li>
              <li>
                <p>
                  退房時間：
                  {checkInAndOut.checkOut}
                </p>
              </li>
            </li>
          </ul>
          <ul className="list-disc ml-4 text-primary leading-6 mr-5  text-md">
            {NewDescription.map((item) => {
              if (item === '') {
                return;
              }
              return <li>{item}</li>;
            })}
          </ul>
          <ul className="flex flex-wrap container mb-4">
            <Amenities amenities={amenities} className="" />
          </ul>
        </div>
      </div>
    );
  } catch (error) {}
};
export default ShowRoom;
