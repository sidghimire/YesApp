import React from "react";

const InputView = ({ label, setValue, value }) => {
  return (
    <>
      <label htmlFor="" className="text-gray-600" style={{ fontSize: 12 }}>
        {label}
      </label>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={label}
        type="text"
        className="p-2 border border-gray-400 rounded w-full"
        style={{ fontSize: 14 }}
        name=""
        id=""
      />
    </>
  );
};

export default InputView;
