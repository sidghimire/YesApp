import React, { useState } from "react";
import { RoomTab } from "./components/Room/RoomTab";
import { ModalProvider } from "styled-react-modal";

import ModalView from "./components/Room/ModalView";

const roomdata = [
  {
    roomNumber: 1,
    roomType: "premium",
    price: 2400,
  },
  {
    roomNumber: 2,
    roomType: "regular",
    price: 2000,
  },
  {
    roomNumber: 3,
    roomType: "regular",
    price: 2000,
  },
  {
    roomNumber: 4,
    roomType: "premium",
    price: 2400,
  },
  {
    roomNumber: 1,
    roomType: "premium",
    price: 2400,
  },
  {
    roomNumber: 2,
    roomType: "regular",
    price: 2000,
  },
  {
    roomNumber: 3,
    roomType: "regular",
    price: 2000,
  },
  {
    roomNumber: 4,
    roomType: "premium",
    price: 2400,
  },
];

const Room = () => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal(e) {
    setIsOpen(!isOpen);
  }
  return (
    <ModalProvider>
      <div className="w-full h-full">
        <div className="p-8">
          <div className="text-2xl tracking-tighter">Manage Rooms</div>
          <button
            onClick={toggleModal}
            className="rounded-xl bg-blue-800 text-white text-sm py-2 px-8 mt-10 mx-4"
          >
            Add New Room
          </button>
          <div className="pt-5">
            <RoomTab />
          </div>
        </div>
        <ModalView
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleModal={toggleModal}
        />
      </div>
    </ModalProvider>
  );
};

export default Room;
