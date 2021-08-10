import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

function Header({ textColor = "black", placeholder }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numOfGuests, setNumOfGuests] = useState(1);
  const router = useRouter();

  // SEARCH FUNCTION
  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numOfGuests,
      },
    });
    setSearchInput("");
  };

  // CONFIG FOR DATERANGEPICKER
  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };
  // FUNCTION TO HANDLE DATE SELECTION
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  return (
    <header
      className={`sticky top-0 z-50 grid grid-cols-4 items-center bg-white text-${textColor} shadow-md p-5 md:px-10`}
    >
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 cursor-pointer"
      >
        <Image
          src="/logo.png"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      <div className=" flex col-span-2 items-center md:border-2 rounded-full py-2 md:mx-2 ">
        <input
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className={`flex-grow pl-5 bg-transparent outline-none  text-${textColor} placeholder-gray-400`}
          type="text"
          placeholder={placeholder || "Start your search"}
        />
        <SearchIcon className="hidden md:inline-flex mr-5 h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer" />
      </div>
      <div className="flex items-center justify-end space-x-4 ">
        <p className="hidden md:inline ">Become a host</p>
        <GlobeAltIcon className="hidden md:inline h-6" />
        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-4 mx-auto">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5861"]}
            onChange={handleSelect}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <UserCircleIcon className="h-5" />
            <input
              value={numOfGuests}
              onChange={(e) => setNumOfGuests(e.target.value)}
              min={1}
              type="number"
              className="w-12 pl-2 text-md outline-none text-red-400"
            />
          </div>
          <div className="flex">
            <button
              className="flex-grow text-gray-500"
              onClick={() => {
                setSearchInput(""), setNumOfGuests(1);
              }}
            >
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-red-500">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
