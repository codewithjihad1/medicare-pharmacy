import React from 'react'
import HeroSlider from './components/HeroSlider'
import CategoryCards from './components/CategoryCards/CategoryCards'
import DiscountProducts from './components/DiscountProducts/DiscountProducts'
import HealthBlog from './components/HealthBlog/HealthBlog'
import HealthcarePartners from './components/HealthCarePartners/HealthCarePartners'
import { useTitle, PAGE_TITLES } from '../../hooks/useTitle'

const Home = () => {
  useTitle(PAGE_TITLES.HOME);

  return (
    <>
      <HeroSlider />
      <CategoryCards />
      <DiscountProducts />
      <HealthBlog />
      <HealthcarePartners />
    </>
  )
}

export default Home
