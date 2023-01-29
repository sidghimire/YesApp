import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getTableList } from "./components/Restaurant/functions/function";
import { TabData } from "./components/Restaurant/TabData";
import { ModalProvider } from "styled-react-modal";

const Restaurant = () => {
  const [tableData, setTableData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState();
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const getTableData = async () => {
    const arr = await getTableList();
    setTableData(arr);
  };
  useEffect(() => {
    getTableData();
  }, []);
  return (
    <ModalProvider>
      <div className="p-5">
        <div className="text-base font-medium tracking-tighter mb-5">
          Restaurant Order
        </div>
        <TabData
          setSelectedTable={setSelectedTable}
          toggleModal={toggleModal}
          tableData={tableData}
        />
      </div>
    </ModalProvider>
  );
};

export default Restaurant;
