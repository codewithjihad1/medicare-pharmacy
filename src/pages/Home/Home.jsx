import React from 'react'
import HeroSlider from './components/HeroSlider'
import CategoryCards from './components/CategoryCards/CategoryCards'
import DiscountProducts from './components/DiscountProducts/DiscountProducts'
import HealthBlog from './components/HealthBlog/HealthBlog'
import HealthcarePartners from './components/HealthCarePartners/HealthCarePartners'

const Home = () => {
  return (
    <main>
      <HeroSlider />
      <CategoryCards />
      <DiscountProducts />
      <HealthBlog />
      <HealthcarePartners />
    </main>
  )
}

export default Home
