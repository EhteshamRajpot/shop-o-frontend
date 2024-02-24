import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminDashboardMain from "../components/Admin/AdminDashboardMain.tsx";
import { getAllOrdersOfAdmin } from "../redux/actions/order.tsx";
import { getAllSellers } from "../redux/actions/sellers.tsx";

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={1} />
          </div>
          <AdminDashboardMain getAllOrdersOfAdmin={getAllOrdersOfAdmin} getAllSellers={getAllSellers}/>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;