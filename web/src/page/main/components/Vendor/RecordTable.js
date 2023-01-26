import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";
let data = [
  { productId: 10248, productName: "VINET", quantity: 190 },
  { productId: 10249, productName: "TOMSP", quantity: 23 },
  { productId: 10250, productName: "HANAR", quantity: 23 },
  { productId: 10251, productName: "VICTE", quantity: 20 },
  { productId: 10248, productName: "VINET", quantity: 190 },
  { productId: 10249, productName: "TOMSP", quantity: 23 },
  { productId: 10250, productName: "HANAR", quantity: 23 },
];
const EntryRow = ({ d1, index }) => {
  return (
    <div className="flex ">
      <div className="w-20 text-sm border border-gray-200 p-3 flex">
        <span className="ml-auto ">{index + 1}</span>
      </div>
      <div className="flex-1 text-sm border border-gray-200 p-3 text-center underline">
        <Link
          to={{
            pathname: "/vendor/info/bill",
          }}
          state={d1.productId}
        >
          {d1.productId}
        </Link>
      </div>
      <div className="flex-1 text-sm border border-gray-200 p-3 text-center">
        3456
      </div>
      <div className="flex-1 text-sm border border-gray-200 p-3 text-center">
        2023/4/5
      </div>
      <div className="flex-1 text-sm border border-gray-200 p-3 flex flex-row">
        <span className="flex-1 text-center">Rs. 500</span>
        <button className=" bg-black rounded px-2 p-2 ml-auto">
          <IoChevronDown size={12} color="#fff" />
        </button>
      </div>
    </div>
  );
};

const RecordTable = () => {
  return (
    <div className="rounded-xl">
      <div className="flex bg-gray-200 border border-gray-300 p-3">
        <div className="w-20">S.N</div>
        <div className="flex-1 text-center">Transaction No.</div>
        <div className="flex-1 text-center">Bill No.</div>
        <div className="flex-1 text-center">Date</div>
        <div className="flex-1 text-center">Amount</div>
      </div>
      {data.map((d1, index) => (
        <EntryRow d1={d1} index={index} />
      ))}
      <div className="flex bg-gray-200 border border-gray-300 p-3">
        <div className="flex-1"></div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-center"></div>
        <div className="flex-1 text-left text-gray-700">Total: </div>
      </div>
    </div>
  );
};

export default RecordTable;
