import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "../components/main/Sidebar";
import * as TabPage from "../page/main";
const MainRouter = () => {
  return (
    <div className="">
      <BrowserRouter>
        <div className="flex flex-row">
          <div className="w-60">
            <Sidebar />
          </div>
          <div className="flex-1 ">
            <Routes>
              <Route path="/" element={<TabPage.Dashboard />} />
              <Route path="/menu" element={<TabPage.Menu />} />
              <Route path="/dashboard" element={<TabPage.Dashboard />} />
              <Route path="/room" element={<TabPage.Room />} />
              <Route path="/restaurant" element={<TabPage.Restaurant />} />
              <Route path="/kitchen" element={<TabPage.Kitchen />} />
              <Route
                path="/stockmanagement"
                element={<TabPage.StockManagement />}
              />
              <Route path="/housekeeping" element={<TabPage.HouseKeeping />} />
              <Route path="/finance" element={<TabPage.Finance />} />
              <Route path="/employees" element={<TabPage.Employees />} />
              <Route path="/manageuser" element={<TabPage.ManageUser />} />
              <Route path="/history" element={<TabPage.History />} />
              <Route path="/setting" element={<TabPage.Setting />} />
              <Route path="/vendor" element={<TabPage.Vendor />} />
              <Route path="/vendor/info" element={<TabPage.VendorInfo />} />
              <Route path="/vendor/info/bill" element={<TabPage.BillPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default MainRouter;
