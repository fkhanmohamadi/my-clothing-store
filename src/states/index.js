import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/categorySlice";
import ordersSlice from "./slices/ordersSlice";
import productsSlice from "./slices/productsSlice";
import subcategorySlice from "./slices/subcategorySlice";
import brandsSlice from "./slices/bransSlice"
import colorsSlise from "./slices/colorsSlise";
import sizesSlise from "./slices/sizesSlise";

export const store = configureStore({
    reducer:{
        orders:ordersSlice,
        products:productsSlice,
        category:categorySlice,
        subcategory:subcategorySlice,
        brands:brandsSlice,
        colors:colorsSlise,
        sizes:sizesSlise,
    }
})