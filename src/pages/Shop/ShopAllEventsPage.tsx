import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.tsx';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar.tsx';
import AllEvents from "../../components/Shop/AllEvents.tsx";
import { useDispatch } from 'react-redux';
import { getAllEventsShop } from '../../redux/actions/event.tsx';

const ShopAllEventsPage = () => {
    const dispatch = useDispatch()
    return (
        <div>
            <DashboardHeader />
            <div className="flex items-start justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                    <DashboardSideBar active={5} />
                </div>
                <div className="w-full justify-center flex">
                    <AllEvents dispatch={dispatch} getAllEventsShop={getAllEventsShop} />
                </div>
            </div>
        </div>
    )
}

export default ShopAllEventsPage