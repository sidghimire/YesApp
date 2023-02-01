import React, { useState } from "react";
import { useEffect } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { getRoomList } from "./functions/function";
import ModalView from "./ModalView";
import {
  extreSmallFont,
  largeFont,
  mediumFont,
  smallFont,
} from "../../../../theme";
export const RoomTab = ({ available, booked, reserved }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useState([]);
  const [type, setType] = useState();
  const toggleModal = function () {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" flex flex-col">
      <div className="flex flex-col flex-wrap ">
        <div className=" pb-0 mt-4 text-xl" style={{ fontSize: 12 }}>
          Available Room
        </div>
        <div className="flex">
          {available.map((item) => (
            <div className="p-4">
              <RoomCard
                item={item}
                setState={setRoomInfo}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setType={setType}
              />
            </div>
          ))}
          {reserved.map((item) => (
            <div className="p-4">
              <RoomCardReserved
                state={item}
                item={item}
                setState={setRoomInfo}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setType={setType}
              />
            </div>
          ))}
          {booked.map((item) => (
            <div className="p-4">
              <RoomCardBooked
                state={item}
                item={item}
                setState={setRoomInfo}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                setType={setType}
              />
            </div>
          ))}
        </div>
      </div>
      <ModalView
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toggleModal={toggleModal}
        state={roomInfo}
        type={type}
      />
    </div>
  );
};

export const RoomCard = ({ item, setState, setIsOpen, isOpen, setType }) => {
  return (
    <button
      onClick={() => {
        setState(item);
        setIsOpen(!isOpen);
        setType("NewRoom");
      }}
      className="bg-gray-200 w-28 rounded-2xl flex flex-col p-4"
    >
      <div className="ml-auto">
        <IoEllipsisVertical size={10} />
      </div>
      <div
        className="text-2xl text-center my-3 mx-auto"
        style={{ fontSize: mediumFont }}
      >
        {item.roomNumber}
      </div>
      {item.type == "Premium" ? (
        <div
          className="capitalize mt-auto bg-yellow-500 px-3 py-1 rounded-xl "
          style={{ alignSelf: "flex-start", fontSize: 8 }}
        >
          {item.type}
        </div>
      ) : (
        <div
          className="capitalize mt-auto bg-white text-black px-3 py-1 rounded-xl"
          style={{ alignSelf: "flex-start", fontSize: 8 }}
        >
          {item.type}
        </div>
      )}

      <div className="flex m-1 mt-2" style={{ fontSize: 8 }}>
        <div className="mr-2 ">Price:</div>
        <div className="">Rs.{item.price}</div>
      </div>
    </button>
  );
};
export const RoomCardReserved = ({
  item,
  setState,
  setIsOpen,
  isOpen,
  setType,
}) => {
  console.log(item);
  return (
    <button
      onClick={() => {
        setState(item);
        setIsOpen(!isOpen);
        setType("Reserve");
      }}
      className="border border-orange-500 bg-orange-100 w-28 rounded-2xl flex flex-col p-4"
    >
      <div className="ml-auto">
        <IoEllipsisVertical size={10} />
      </div>
      <div
        className="text-2xl text-center my-3 mx-auto"
        style={{ fontSize: mediumFont }}
      >
        {item.roomNumber}
      </div>
      {item.roomType == "Premium" ? (
        <div
          className="capitalize mt-auto bg-yellow-500 px-3 py-1 rounded-xl "
          style={{ alignSelf: "flex-start", fontSize: 8 }}
        >
          {item.roomType}
        </div>
      ) : (
        <div
          className="capitalize mt-auto bg-white text-black px-3 py-1 rounded-xl"
          style={{ alignSelf: "flex-start", fontSize: 8 }}
        >
          {item.roomType}
        </div>
      )}

      <div className="flex m-1 mt-2" style={{ fontSize: 8 }}>
        <div className="mr-2 ">Price:</div>
        <div className="">Rs.{item.roomRate}</div>
      </div>
    </button>
  );
};
export const RoomCardBooked = ({
  item,
  setState,
  setIsOpen,
  isOpen,
  setType,
}) => {
  return (
    <button
      onClick={() => {
        setState(item);
        setIsOpen(!isOpen);
        setType("Booked");
      }}
      className="border border-green-500 bg-green-100 w-28 rounded-2xl flex flex-col p-4"
    >
      <div className="ml-auto">
        <IoEllipsisVertical size={10} />
      </div>
      <div
        className="text-2xl text-center my-3 mx-auto"
        style={{ fontSize: mediumFont }}
      >
        {item.roomNumber}
      </div>
      {item.roomType == "Premium" ? (
        <div
          className="capitalize mt-auto bg-yellow-500 px-3 py-1 rounded-xl "
          style={{ alignSelf: "flex-start", fontSize: 8 }}
        >
          {item.roomType}
        </div>
      ) : (
        <div
          className="capitalize mt-auto bg-white text-black px-3 py-1 rounded-xl"
          style={{ alignSelf: "flex-start", fontSize: 8 }}
        >
          {item.roomType}
        </div>
      )}

      <div className="flex m-1 mt-2" style={{ fontSize: 8 }}>
        <div className="mr-2 ">Price:</div>
        <div className="">Rs.{item.roomRate}</div>
      </div>
    </button>
  );
};
