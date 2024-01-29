import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.tsx'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar.tsx'
import AllOrders from "../../components/Shop/AllOrders.tsx";
import { getAllOrdersOfShop } from '../../redux/actions/order.tsx';

const ShopAllOrdersPage = () => {
  return (
    <div>
            <DashboardHeader />
            <div className="flex justify-between w-full">
                <div className="w-[80px] 800px:w-[330px]">
                  <DashboardSideBar active={2} />
                </div>
                <div className="w-full justify-center flex">
                   <AllOrders getAllOrdersOfShop={getAllOrdersOfShop}/>
                </div>
              </div>
        </div>
  )
}

export default ShopAllOrdersPage