import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { getTableList } from "./functions/function";

export const RestaurantTab = () => {
  const [tableData, setTableData] = React.useState([]);
  const getAllData = async () => {
    const arr = await getTableList();
    console.log(arr);
    setTableData(arr);
  };

  React.useEffect(() => {
    getAllData();
  }, []);
  return (
    <div className="flex flex-row flex-wrap ">
      {tableData.map((item) => (
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
      <div className="text-2xl text-center my-auto">{item.tableNumber}</div>
    </div>
  );
};
