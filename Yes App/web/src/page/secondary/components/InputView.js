import React from "react";
import { extreSmallFont, smallFont } from "../../../theme";

const InputView = ({ label, setValue, value }) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor="" className="text-gray-600" style={{ fontSize: 8 }}>
        {label}
      </label>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={label}
        type="text"
        className="p-2 border border-gray-400 rounded w-full"
        style={{ fontSize: 10 }}
        name=""
        id=""
      />
    </div>
  );
};

export default InputView;
