import React from 'react'
import ImageField from '../../components/img'
import Header from '../../layout/header'
import SubCategory from '../../components/subcategory'
import ProductsCart from '../../components/products-cart'

function HomeScreen() {
  return (
    <div>
      <Header/>
      <ImageField className="w-screen bg-cover bg-center bg-no-repeat" src="/BGImage.webp" alt="baner"/>
      <SubCategory/>
      <ProductsCart/>
    </div>
  )
}

export default HomeScreen
