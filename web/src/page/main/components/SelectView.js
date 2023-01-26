import React from "react";

const SelectView = ({ label, data }) => {
  return (
    <>
      <label htmlFor="" className="text-gray-600" style={{ fontSize: 12 }}>
        {label}
      </label>
      <select className="p-2 border border-gray-400 rounded w-full text-sm">
        {data.map((d1) => (
          <option className="capitalize" value={d1}>
            {d1}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectView;
