import React from 'react'
import ImageField from '../../components/img'
import Header from '../../layout/header'
import Footer from '../../layout/footer'
import SubCategory from '../../components/subcategory'
import ProductsCart from '../../components/products-cart'
import Landing from '../../components/landing'

function HomeScreen() {
  return (
    <div>
      <Header/>
      <Landing/>
      {/* <ImageField className="w-screen bg-cover bg-center bg-no-repeat" src="/BGImage.webp" alt="baner"/> */}
      <SubCategory/>
      {/* <ProductsCart/> */}
      <Footer/>
    </div>
  )
}

export default HomeScreen
