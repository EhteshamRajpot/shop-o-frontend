import React from "react";
import { loadSeller } from "../../redux/actions/user.tsx";
import ShopSettings from "../../components/Shop/ShopSettings.tsx";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.tsx";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar.tsx";

const ShopSettingsPage = () => {
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSideBar active={11} />
                </div>
                <ShopSettings loadSeller={loadSeller} />
            </div>
        </div>
    );
};

export default ShopSettingsPage;