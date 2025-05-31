import React from 'react'
import ImageField from '../../components/img'
import Headre from '../../layout/header'
import SubCategory from '../../components/subcategory'
import ProductsCart from '../../components/products-cart'

function HomeScreen() {
  return (
    <div>
      <Headre/>
      <ImageField className="w-screen object-cover my-2" src="./baner.jpg" alt="baner"/>
      <SubCategory/>
      <ProductsCart/>
    </div>
  )
}

export default HomeScreen
