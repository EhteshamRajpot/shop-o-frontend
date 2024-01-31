import React from 'react'
import WithdrawMoney from "../../components/Shop/WithdrawMoney.tsx";
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.tsx'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar.tsx';
import { getAllOrdersOfShop } from '../../redux/actions/order.tsx';
import { loadSeller } from '../../redux/actions/user.tsx';

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashboardSideBar active={7} />
      </div>
       <WithdrawMoney getAllOrdersOfShop={getAllOrdersOfShop} loadSeller={loadSeller}/>
    </div>
  </div>
  )
}

export default ShopWithDrawMoneyPage