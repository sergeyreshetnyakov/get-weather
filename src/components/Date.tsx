/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight, ArrowLeft } from "react-feather";

interface IProps {
  date: string;
  weekday: string;
  handlePrevious: any;
  handleNext: any;
}

const Date = ({ date, weekday, handlePrevious, handleNext }: IProps) => {
  return (
    <div className="flex justify-center w-screen pt-32 pb-48">
      <button onClick={() => handlePrevious()}>
        <ArrowLeft size={40} color="#fff" strokeWidth="2px"/>
      </button>
      <div className="flex-col justify-center px-4">
        <div>
          <h1 className="text-3xl text-white font-medium">{date}</h1>
          <h3 className="text-xl text-center text-white">{weekday}</h3>
        </div>
      </div>
      <button onClick={() => handleNext()}>
        <ArrowRight size={40} color="#fff" strokeWidth="2px"/>
      </button>
    </div>
  );
};

export default Date;
