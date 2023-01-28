import React from "react";
import Modal from "styled-react-modal";
import { IoClose } from "react-icons/io5";
import InputView from "../InputView";
import SelectView from "../SelectView";

const ModalView = ({ isOpen, setIsOpen, toggleModal, state }) => {
  const [customerName, setCustomerName] = React.useState();
  const [citizenship, setCitizenship] = React.useState();
  const [price, setPrice] = React.useState();
  const [roomType, setRoomType] = React.useState("Premium");
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div className="bg-white rounded-xl p-5 w-1/2">
        <div className="flex">
          <span className="text-xl tracking-tighter">Book New Room</span>
          <div className="ml-auto">
            <button onClick={toggleModal}>
              <IoClose size={20} />
            </button>
          </div>
        </div>
        <div className="mt-5">
          <div className="bg-gray-200 w-44 h-44 rounded-2xl flex flex-col p-4 mx-auto">
            <div className="text-2xl text-center my-auto">
              {state.roomNumber}
            </div>
            {state.type == "Premium" ? (
              <div
                className="capitalize mt-auto bg-yellow-500 px-3 py-1 rounded-xl "
                style={{ alignSelf: "flex-start", fontSize: 12 }}
              >
                {state.type}
              </div>
            ) : (
              <div
                className="capitalize mt-auto bg-white text-black px-3 py-1 rounded-xl"
                style={{ alignSelf: "flex-start", fontSize: 12 }}
              >
                {state.type}
              </div>
            )}

            <div className="flex m-1 mt-2" style={{ fontSize: 12 }}>
              <div className="mr-2 ">Price:</div>
              <div className="">Rs.{state.price}</div>
            </div>
          </div>
          <div className="my-4">
            <InputView
              label={"Customer Name"}
              value={customerName}
              setValue={setCustomerName}
            />
          </div>
          <div className="my-4">
            <InputView
              label={"Citizenship No:"}
              value={citizenship}
              setValue={setCitizenship}
            />
          </div>
          <div className="my-4">
            <InputView label={"Price"} value={price} setValue={setPrice} />
          </div>

          <button className="bg-green-700 p-3 text-white rounded-xl w-full mt-8">
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalView;
