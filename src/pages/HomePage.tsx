import React from 'react';
import Hero from "../components/Route/Hero/Hero.tsx";
import Header from "../components/Layout/Header.tsx";
import Categories from '../components/Route/Categories/Categories.tsx';
import BestDeals from "../components/Route/BestDeals/BestDeals.tsx";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct.tsx";
import Events from "../components/Events/Events.tsx";
import Sponsored from "../components/Route/Sponsored.tsx";
import Footer from "../components/Layout/Footer.tsx";

interface HomePage {
  activeHeading: number
}
const HomePage: React.FC<HomePage> = () => {
  return (
    <>
      <Header activeHeading={"1"} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </>
  )
}

export default HomePage