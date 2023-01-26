import React, { useState } from "react";
import { ModalProvider } from "styled-react-modal";
import ModalView from "./components/Stock/ModalView";
import DataFrame from "../../components/ArkoLibrary/DataFrame";
import ModalViewNewEntry from "./components/Stock/ModalViewNewEntry";
import NewPurchaseBill from "./components/Stock/NewPurchaseBill";

let data = [
  { productId: 10248, productName: "VINET", quantity: 190 },
  { productId: 10249, productName: "TOMSP", quantity: 23 },
  { productId: 10250, productName: "HANAR", quantity: 23 },
  { productId: 10251, productName: "VICTE", quantity: 20 },
  { productId: 10248, productName: "VINET", quantity: 190 },
  { productId: 10249, productName: "TOMSP", quantity: 23 },
  { productId: 10250, productName: "HANAR", quantity: 23 },
];
let title = ["Product Id", "Name", "Quantity"];
const Stock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNew, setIsOpenNew] = useState(false);
  const [openPurchaseBill, setOpenPurchaseBill] = useState(false);
  function toggleModal(e) {
    setIsOpen(!isOpen);
  }
  function toggleModal2(e) {
    setIsOpenNew(!isOpenNew);
  }
  function toggleModal3(e) {
    setOpenPurchaseBill(!openPurchaseBill);
  }
  return (
    <ModalProvider>
      <div className="w-full h-full">
        <div className="p-8">
          <div className="text-2xl tracking-tighter">Manage Stock</div>
          <div className="flex flex-row">
            <button
              onClick={toggleModal}
              className="rounded-xl bg-blue-800 text-white text-sm py-2 px-8 mt-10 mx-4"
            >
              Add To Stock
            </button>
            <button
              onClick={toggleModal2}
              className="rounded-xl border border-gray-300 text-black text-sm py-2 px-8 mt-10 mx-4"
            >
              Add New Entry
            </button>
            <button
              onClick={toggleModal3}
              className="rounded-xl border bg-green-700 text-white text-sm py-2 px-8 mt-10 mx-4"
            >
              New Purchase Bill
            </button>
          </div>
        </div>
        <div className="px-12 pb-8">
          <DataFrame data={data} title={title} />
        </div>
        <ModalView isOpen={isOpen} toggleModal={toggleModal} />
        <ModalViewNewEntry isOpen={isOpenNew} toggleModal={toggleModal2} />
        <NewPurchaseBill isOpen={openPurchaseBill} toggleModal={toggleModal3} />
      </div>
    </ModalProvider>
  );
};

export default Stock;
