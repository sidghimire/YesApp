import React from "react";
import Modal from "styled-react-modal";
import { IoClose } from "react-icons/io5";
import InputView from "../InputView";

const ModalView = ({ isOpen, toggleModal }) => {
  const [tableNumber, setTableNumber] = React.useState();
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div className="bg-white rounded-xl p-5 w-1/3 h-1/3">
        <div className="flex">
          <span className="text-xl tracking-tighter">Add New Table</span>
          <div className="ml-auto">
            <button onClick={toggleModal}>
              <IoClose size={20} />
            </button>
          </div>
        </div>
        <div className="mt-5">
          <div className="my-4">
            <InputView
              label={"Table Number"}
              value={tableNumber}
              setValue={setTableNumber}
            />
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
