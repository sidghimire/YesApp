import React from "react";
import { ModalProvider } from "styled-react-modal";
import { RoomTab } from "./components/Room/RoomTab";
import { useEffect } from "react";
import { getRoomList } from "./components/Room/functions/function";
import { useState } from "react";
import { largeFont } from "../../theme";

const Room = () => {
  const [available, setAvailable] = useState([]);
  const [booked, setBooked] = useState([]);
  const [reserved, setReserved] = useState([]);
  const getAllData = async () => {
    const arr = await getRoomList();
    setAvailable(arr.arr);
    setBooked(arr.arr2);
    setReserved(arr.arr3);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <ModalProvider>
      <div className="w-full h-full">
        <div className="p-8">
          <div
            className="text-2xl tracking-tighter"
            style={{ fontSize: largeFont }}
          >
            Book Room
          </div>
          <RoomTab available={available} booked={booked} reserved={reserved} />
        </div>
      </div>
    </ModalProvider>
  );
};

export default Room;
