import React, { useState } from "react";
import { useEffect } from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { getRoomList } from "./functions/function";

export const RoomTab = () => {
  const [roomdata, setRoomData] = useState([]);
  const getAllData = async () => {
    const arr = await getRoomList();
    setRoomData(arr);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div className="flex flex-row flex-wrap ">
      {roomdata.map((item) => (
        <div className="p-4">
          <RoomCard item={item} />
        </div>
      ))}
    </div>
  );
};

export const RoomCard = ({ item }) => {
  return (
    <div className="bg-gray-200 w-44 h-44 rounded-2xl flex flex-col p-4">
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
    </div>
  );
};
