import React from "react";
import { ModalProvider } from "styled-react-modal";
import { RoomTab } from "./components/Room/RoomTab";
import { useEffect } from "react";
import { getRoomList } from "./components/Room/functions/function";
import { useState } from "react";
import { largeFont } from "../../theme";

const Room = () => {
  const [rerender, setRerender] = useState(false);
  const [available, setAvailable] = useState([]);
  const [booked, setBooked] = useState([]);
  const [reserved, setReserved] = useState([]);
  const [dirty, setDirty] = useState([]);
  const getAllData = async () => {
    const arr = await getRoomList();
    setAvailable(arr.arr);
    setBooked(arr.arr3);
    setReserved(arr.arr2);
    setDirty(arr.arr4);
  };

  useEffect(() => {
    getAllData();
  }, [rerender]);
  return (
    <ModalProvider>
      <div className="w-full h-full overflow-y-scroll">
        <div className="p-8">
          <div
            className="text-2xl tracking-tighter"
            style={{ fontSize: largeFont }}
          >
            Book Room
          </div>
          <RoomTab
            rerender={rerender}
            setRerender={setRerender}
            available={available}
            booked={booked}
            reserved={reserved}
            dirty={dirty}
          />
        </div>
      </div>
    </ModalProvider>
  );
};

export default Room;
