import React, { useState } from "react";
import Modal from "styled-react-modal";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DatePicker = ({ label }) => {
  const [selected, setSelected] = React.useState(new Date());
  const [isDateOpen, setDateIsOpen] = useState(false);
  function toggleModal(e) {
    setDateIsOpen(!isDateOpen);
  }
  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = (
      <p className="mt-5 italic">You picked {format(selected, "PP")}.</p>
    );
  }

  return (
    <>
      <label htmlFor="" className="text-gray-600" style={{ fontSize: 12 }}>
        {label}
      </label>
      <button
        onClick={toggleModal}
        className="p-2 border text-sm border-gray-400 rounded w-full text-left text-gray-400"
      >
        Select Date
      </button>
      <Modal
        isOpen={isDateOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <div className="bg-white p-3 rounded-xl">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            footer={footer}
          />
        </div>
      </Modal>
    </>
  );
};

export default DatePicker;
