import React from "react";
import Image from "next/image";
import Header from "./Header";

function Banner() {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[550px]">
      {/* {scrollState === "top" && (
        <Header background="transparent" textColor="white" />
      )} */}
      <Image
        src="https://a0.muscache.com/im/pictures/e4a2a61c-589f-4e49-b3b8-968a6bc23389.jpg?im_w=2560"
        alt="Olympic picture"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-1/4 ml-10 md:ml-20">
        <p className="sm:text-base lg:text-6xl font-bold text-white">
          Olympian &
        </p>
        <p className="sm:text-base lg:text-6xl font-bold text-white">
          Paralympian
        </p>
        <p className="sm:text-base lg:text-6xl font-bold text-white">Online</p>
        <p className="sm:text-base lg:text-6xl font-bold text-white">
          Experience
        </p>
        <button className="bg-white font-medium px-2 py-1 shadow-md rounded-lg my-3 md:my-5 transition-transform ease-out hover:scale-105 duration-300">
          Explore now
        </button>
      </div>
    </div>
  );
}

export default Banner;
