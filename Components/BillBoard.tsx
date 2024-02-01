import useBillBoard from "@/hooks/useBillBoard";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";

const BillBoard = () => {
  const { data } = useBillBoard();
  return (
    <div>
      <video
        className="w-full h-[56] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videyoUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:first-letter:mld-16">
        <p className="text-white text-[8px] md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl ">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <PlayButton movieId={data?.id} />
        <div className="flex flex-row items-center mt-3 gap-3 md:mt-3">
          <button className=" bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition">
            <AiOutlineInfoCircle className="mr-1" /> More info
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillBoard;
