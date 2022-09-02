import { ReactComponent as Loading } from "../images/isLoading.svg"

const IsLoading=()=>{
    return (
      <div className=" absolute z-50 h-screen w-screen  bg-white">
        <div className=" mt-60">
          <Loading className=" animate-[spin_3s_linear_infinite] mb-4  w-16 mx-auto" />
        </div>
        <h1 className="animate-pulse text-center text-2xl text-primary ">
          Loading...
        </h1>
      </div>
    );
}


export default IsLoading;