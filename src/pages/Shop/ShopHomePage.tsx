import React from 'react';
import styles from '../../styles/styles';
import ShopInfo from "../../components/Shop/ShopInfo.tsx";
import { getAllEventsShop } from "../../redux/actions/event";
import { getAllProductsShop } from "../../redux/actions/product";
import ShopProfileData from "../../components/Shop/ShopProfileData.tsx";

interface ShopHomePageProps {
  isOwner: boolean,
  isEvent: boolean 
}
const ShopHomePage: React.FC<ShopHomePageProps> = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <ShopInfo isOwner={true} getAllEventsShop={getAllEventsShop} getAllProductsShop={getAllProductsShop } />
        </div>
        <div className="w-[72%] rounded-[4px]">
          <ShopProfileData isEvent={true} isOwner={true} getAllEventsShop={getAllEventsShop} getAllProductsShop={getAllProductsShop} />
        </div>
      </div>
    </div>
  )
}

export default ShopHomePage