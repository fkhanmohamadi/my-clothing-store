import React from "react";
import ImageField from "../../components/img";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import SubCategory from "../../components/subcategory";
import BestSellingProducts from "../../components/Best-selling-products";
import Landing from "../../components/landing";
import CategoryBanner from "../../components/category-banner";
import Services from "../../components/services";

function HomeScreen() {
  return (
    <div>
      <Header />
      <main>
        <Landing />
        <SubCategory />
        <CategoryBanner />
        <BestSellingProducts />
        <Services />
      </main>
      <Footer />
    </div>
  );
}

export default HomeScreen;
