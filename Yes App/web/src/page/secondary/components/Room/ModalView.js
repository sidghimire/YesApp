import React from "react";
import Modal from "styled-react-modal";
import { IoClose } from "react-icons/io5";
import InputView from "../InputView";
import SelectView from "../SelectView";
import { extreSmallFont, smallFont } from "../../../../theme";
import DatePicker from "../../../../components/DatePicker";
import { useState } from "react";
import { addData } from "./functions/function";
import { auth } from "../../../../config/adminFirebase";

const RoomSmallTab = ({ state }) => {
  return (
    <div className="border border-gray-500 w-44 h-44 rounded-2xl flex flex-col p-4 mx-auto">
      <div className="text-2xl text-center my-auto">{state.roomNumber}</div>
      {state.type == "Premium" ? (
        <div
          className="capitalize mt-auto bg-yellow-500 px-3 py-1 rounded-xl "
          style={{ alignSelf: "flex-start", fontSize: 12 }}
        >
          {state.type || state.roomType}
        </div>
      ) : (
        <div
          className="capitalize mt-auto bg-gray-200 text-black px-3 py-1 rounded-xl"
          style={{ alignSelf: "flex-start", fontSize: 12 }}
        >
          {state.type || state.roomType}
        </div>
      )}

      <div className="flex m-1 mt-2" style={{ fontSize: 12 }}>
        <div className="mr-2 ">Price:</div>
        <div className="">Rs.{state.price || state.roomRate}</div>
      </div>
    </div>
  );
};
const ModalView = ({ isOpen, setIsOpen, toggleModal, state, type }) => {
  const [customerName, setCustomerName] = React.useState("Girban");
  const [phoneNumber, setPhoneNumber] = React.useState("9844442363");
  const [nationality, setNationality] = React.useState("Nepali");
  const [idNo, setIdNo] = useState("idNoisthis");
  const [address, setAddress] = useState("Lubhu");
  const [email, setEmail] = useState("siddharthaghimire@gmail.com");
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [noOfNights, setNoOfNights] = useState(2);
  const [arrivedFrom, setArrivedFrom] = useState("kathmandu");
  const [goingTo, setGoingTo] = useState("sarlahi");
  const [purpose, setPurpose] = useState("tours");
  const [occupation, setOccupation] = useState("businessman");
  const [method, setMethod] = useState("cash");
  const [billNo, setBillNo] = useState("bill No");
  const [vehicleNo, setVehicleNo] = useState("Ba 234");
  const [roomRate, setRoomRate] = useState(2300);
  const [advance, setAdvance] = useState(1000);
  const [roomRateType, setRoomRateType] = useState("FA");
  const [noOfGuests, setNoOfGuests] = useState(2);

  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div className="bg-white rounded-xl p-5 w-5/6">
        <div className="flex">
          {type == "NewRoom" && (
            <span className="text-xl tracking-tighter">Book New Room</span>
          )}
          {type == "Reserve" && (
            <span className="text-xl tracking-tighter">Check In</span>
          )}
          {type == "Booked" && (
            <span className="text-xl tracking-tighter">Guest Detail</span>
          )}
          <div className="ml-auto">
            <button onClick={toggleModal}>
              <IoClose size={20} />
            </button>
          </div>
        </div>
        <div className="mt-5">
          <div className="my-4 flex flex-row space-x-2">
            <div className=" px-5">
              <RoomSmallTab state={state} />
            </div>
            <div className="flex flex-col w-full space-y-4 p-3 bg-gray-50 rounded-xl">
              <div className="flex flex-row space-x-6">
                <InputView
                  label={"Customer Name"}
                  value={customerName}
                  setValue={setCustomerName}
                />
                <InputView
                  label={"Phone Number"}
                  value={phoneNumber}
                  setValue={setPhoneNumber}
                />
                <InputView
                  label={"Nationality"}
                  value={nationality}
                  setValue={setNationality}
                />
              </div>
              <div className="flex flex-row space-x-6">
                <InputView label={"Id No:"} value={idNo} setValue={setIdNo} />
                <InputView
                  label={"Address"}
                  value={address}
                  setValue={setAddress}
                />
                <InputView label={"Email:"} value={email} setValue={setEmail} />
              </div>
              <div className="flex flex-row space-x-6">
                <div className="flex flex-col w-full">
                  <DatePicker
                    label={"Check In Date"}
                    setValue={setCheckInDate}
                    value={checkInDate}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <DatePicker
                    label={"Check Out Date"}
                    setValue={setCheckOutDate}
                    value={checkOutDate}
                  />
                </div>

                <InputView
                  label={"No. of Nights:"}
                  value={noOfNights}
                  setValue={setNoOfNights}
                />
              </div>
            </div>
          </div>
          <div className="my-4 flex flex-row space-x-8">
            <InputView
              label={"Arrived From:"}
              value={arrivedFrom}
              setValue={setArrivedFrom}
            />
            <InputView
              label={"Going To:"}
              value={goingTo}
              setValue={setGoingTo}
            />
            <InputView
              label={"Purpose Of Visit:"}
              value={purpose}
              setValue={setPurpose}
            />

            <InputView
              label={"Occupation:"}
              value={occupation}
              setValue={setOccupation}
            />
          </div>

          <div className="my-4 flex flex-row space-x-8">
            <InputView
              label={"Method Of Payment"}
              value={method}
              setValue={setMethod}
            />
            <InputView label={"Bill No."} value={billNo} setValue={setBillNo} />
            <InputView
              label={"Vehicle No."}
              value={vehicleNo}
              setValue={setVehicleNo}
            />
          </div>
          <div className="my-4 mb-0 flex flex-row space-x-8 border border-gray-700 bg-gray-200 p-4 rounded-xl">
            <InputView
              label={"Room Rate"}
              value={roomRate}
              setValue={setRoomRate}
            />
            <InputView
              label={"Advance Payment"}
              value={advance}
              setValue={setAdvance}
            />
            <SelectView
              label={"Room Rate Type"}
              data={["", "EP", "BB", "MAP", "AP"]}
              setValue={setRoomRateType}
            />
            <InputView
              label={"No. Of Guests"}
              value={noOfGuests}
              setValue={setNoOfGuests}
            />
          </div>
          {type == "NewRoom" && (
            <div className="flex flex-row space-x-4">
              <button
                onClick={() =>
                  addData({
                    customerName,
                    phoneNumber,
                    nationality,
                    idNo,
                    address,
                    email,
                    checkInDate,
                    checkOutDate,
                    noOfNights,
                    arrivedFrom,
                    goingTo,
                    purpose,
                    occupation,
                    method,
                    billNo,
                    vehicleNo,
                    roomRate,
                    advance,
                    roomRateType,
                    noOfGuests,
                    roomNumber: state.roomNumber,
                    roomType: state.type,
                    roomOriginalPrice: state.price,
                    discount: state.price - roomRate,
                    status: "Booked",
                    uploadedBy: auth.currentUser.uid,
                  })
                }
                style={{ fontSize: smallFont }}
                className="bg-green-700 p-2 text-white rounded-xl w-full mt-8 flex-1"
              >
                Check In
              </button>
              <button
                onClick={() =>
                  addData({
                    customerName,
                    phoneNumber,
                    nationality,
                    idNo,
                    address,
                    email,
                    checkInDate,
                    checkOutDate,
                    noOfNights,
                    arrivedFrom,
                    goingTo,
                    purpose,
                    occupation,
                    method,
                    billNo,
                    vehicleNo,
                    roomRate,
                    advance,
                    roomRateType,
                    noOfGuests,
                    roomNumber: state.roomNumber,
                    roomType: state.type,
                    roomOriginalPrice: state.price,
                    discount: state.price - roomRate,
                    status: "Reserved",
                    uploadedBy: auth.currentUser.uid,
                  })
                }
                style={{ fontSize: smallFont }}
                className="p-2 text-red-500 rounded-xl w-full mt-8 flex-1 border border-red-500"
              >
                Reserve
              </button>
            </div>
          )}
          {type == "Reserve" && (
            <div className="flex flex-row space-x-4">
              <button
                onClick={() =>
                  addData({
                    customerName,
                    phoneNumber,
                    nationality,
                    idNo,
                    address,
                    email,
                    checkInDate,
                    checkOutDate,
                    noOfNights,
                    arrivedFrom,
                    goingTo,
                    purpose,
                    occupation,
                    method,
                    billNo,
                    vehicleNo,
                    roomRate,
                    advance,
                    roomRateType,
                    noOfGuests,
                    roomNumber: state.roomNumber,
                    roomType: state.type,
                    roomOriginalPrice: state.price,
                    discount: state.price - roomRate,
                    status: "Booked",
                    uploadedBy: auth.currentUser.uid,
                  })
                }
                style={{ fontSize: smallFont }}
                className="bg-green-700 p-2 text-white rounded-xl w-full mt-8 flex-1"
              >
                Check In
              </button>
              <button
                style={{ fontSize: smallFont }}
                className="border border-red-500 bg-red-200 p-2 text-red-800 rounded-xl w-full mt-8 flex-1"
              >
                Cancel Reservation
              </button>
            </div>
          )}
          {type == "Booked" && (
            <div className="flex flex-row space-x-4">
              <button
                onClick={() =>
                  addData({
                    customerName,
                    phoneNumber,
                    nationality,
                    idNo,
                    address,
                    email,
                    checkInDate,
                    checkOutDate,
                    noOfNights,
                    arrivedFrom,
                    goingTo,
                    purpose,
                    occupation,
                    method,
                    billNo,
                    vehicleNo,
                    roomRate,
                    advance,
                    roomRateType,
                    noOfGuests,
                    roomNumber: state.roomNumber,
                    roomType: state.type,
                    roomOriginalPrice: state.price,
                    discount: state.price - roomRate,
                    status: "Booked",
                    uploadedBy: auth.currentUser.uid,
                  })
                }
                style={{ fontSize: smallFont }}
                className="bg-green-700 p-2 text-white rounded-xl w-full mt-8 flex-1"
              >
                Check In
              </button>
              <button
                style={{ fontSize: smallFont }}
                className="border border-red-500 bg-red-200 p-2 text-red-800 rounded-xl w-full mt-8 flex-1"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalView;
