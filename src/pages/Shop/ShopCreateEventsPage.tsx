import React from 'react';
import CreateEvent from "../../components/Shop/CreateEvent.tsx";
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.tsx';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar.tsx';
import { useDispatch } from 'react-redux';

const ShopCreateEventsPage = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSideBar active={6} />
                </div>
                <div className="w-full justify-center flex">
                    <CreateEvent />
                </div>
            </div>
        </div>
    )
}

export default ShopCreateEventsPage