import React, { useState } from "react";
import { useEffect } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { getRoomList } from "./functions/function";
import ModalView from "./ModalView";
export const RoomTab = ({ available, booked, reserveds }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useState([]);
  const toggleModal = function () {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" flex flex-col">
      <div className=" p-5 pb-0 mt-10 text-xl">Available Room</div>
      <div className="flex flex-row flex-wrap ">
        {available.map((item) => (
          <div className="p-4">
            <RoomCard
              item={item}
              setState={setRoomInfo}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          </div>
        ))}
        <ModalView
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleModal={toggleModal}
          state={roomInfo}
        />
      </div>
    </div>
  );
};

export const RoomCard = ({ item, setState, setIsOpen, isOpen }) => {
  return (
    <button
      onClick={() => {
        setState(item);
        setIsOpen(!isOpen);
      }}
      className="bg-gray-200 w-44 h-44 rounded-2xl flex flex-col p-4"
    >
      <div className="ml-auto">
        <IoEllipsisVertical />
      </div>
      <div className="text-2xl text-center my-auto">{item.roomNumber}</div>
      {item.type == "Premium" ? (
        <div
          className="capitalize mt-auto bg-yellow-500 px-3 py-1 rounded-xl "
          style={{ alignSelf: "flex-start", fontSize: 12 }}
        >
          {item.type}
        </div>
      ) : (
        <div
          className="capitalize mt-auto bg-white text-black px-3 py-1 rounded-xl"
          style={{ alignSelf: "flex-start", fontSize: 12 }}
        >
          {item.type}
        </div>
      )}

      <div className="flex m-1 mt-2" style={{ fontSize: 12 }}>
        <div className="mr-2 ">Price:</div>
        <div className="">Rs.{item.price}</div>
      </div>
    </button>
  );
};
