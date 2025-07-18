import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/categorySlice";
import ordersSlice from "./slices/ordersSlice";
import productsSlice from "./slices/productsSlice";
import subcategorySlice from "./slices/subcategorySlice";
import brandsSlice from "./slices/bransSlice";
import colorsSlise from "./slices/colorsSlise";
import sizesSlise from "./slices/sizesSlise";
import categorySubcategoryRelSlice from "./slices/categorySubcategoryRelSlice";
import companyServicesSlice from "./slices/companyServicesSlice";
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    orders: ordersSlice,
    products: productsSlice,
    category: categorySlice,
    subcategory: subcategorySlice,
    colors: colorsSlise,
    sizes: sizesSlise,
    categorySubcategoryRelation: categorySubcategoryRelSlice,
    companyServices: companyServicesSlice,
    cart:cartSlice,
  },
});
