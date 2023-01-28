import React from "react";
import sidebar from "../../data/sidebar.json";
import { Link } from "react-router-dom";
import { signOutFromAccount } from "../Authentication/functions/function";
import { UserContext } from "../../contexts/context";
import { useState } from "react";

const Sidebar = () => {
  const value = React.useContext(UserContext).admin;
  return (
    <div className=" w-60 h-screen dark:overflow-auto overflow-auto bg-gray-100 fixed">
      <div className="">
        <Link to="/">
          <div className="text-2xl font-bold tracking-tighter m-7">Nyano</div>
        </Link>
        {value ? (
          <>
            {sidebar.tab.map((val) => (
              <Link to={val[1]}>
                <div className=" mx-4 rounded-xl px-3 py-4 text-sm hover:bg-gray-300 tracking-tighter text-gray-700">
                  {val[0]}
                </div>
              </Link>
            ))}
          </>
        ) : (
          <>
            {sidebar.secondary.map((val) => (
              <Link to={val[1]}>
                <div className=" mx-4 rounded-xl px-3 py-4 text-sm hover:bg-gray-300 tracking-tighter text-gray-700">
                  {val[0]}
                </div>
              </Link>
            ))}
          </>
        )}
        <button className="w-full" onClick={() => signOutFromAccount()}>
          <div className=" mx-4 rounded-xl px-3 py-4 text-sm hover:bg-red-800 bg-red-700 tracking-tighter text-white mt-10">
            Logout
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
