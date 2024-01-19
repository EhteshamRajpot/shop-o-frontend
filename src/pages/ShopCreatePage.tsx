import React, { useEffect } from 'react';
import ShopCreate from "../components/Shop/ShopCreate.tsx";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const { isSeller, seller } = useSelector((state: any) => state.seller);

  useEffect(() => {
    console.log("isSeller:", isSeller);
    console.log("seller:", seller);
    if (isSeller === true && seller && seller._id) {
      navigate(`/shop/${seller?._id}`)
    }
  }, [isSeller, seller])

  return (
    <div><ShopCreate /></div>
  )
}

export default ShopCreatePage