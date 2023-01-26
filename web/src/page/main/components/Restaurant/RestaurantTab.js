import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";

export const RestaurantTab = ({ data }) => {
  return (
    <div className="flex flex-row flex-wrap ">
      {data.map((item) => (
        <div className="p-4">
          <RestaurantCard item={item} />
        </div>
      ))}
    </div>
  );
};

export const RestaurantCard = ({ item }) => {
  return (
    <div className="bg-gray-200 w-44 h-44 rounded-2xl flex flex-col p-4">
      <div className="ml-auto">
        <IoEllipsisVertical />
      </div>
      <div className="text-2xl text-center my-auto">{item.roomNumber}</div>
    </div>
  );
};
