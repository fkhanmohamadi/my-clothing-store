import HomeScreen from "./pages/home";
import Login from "./pages/login";
import RegisterPage from "./pages/register";

import Product from "./pages/product";
import Products from "./pages/products";

import ShoppingCart from "./pages/cart";
import Checkout from "./pages/checkout";
import Payment from "./pages/payment";
import PaymentResultFail from "./pages/payment-result-fail";
import PaymentResultSuccess from "./pages/payment-result-success";

import Profile from "./pages/profile";
import ProfileHome from "./components/profile-home";
import ProfieOrders from "./components/profile-orders";

import Admin from "./pages/admin";
import AdminHome from "./components/admin-home";
import AdminOrdersManagment from "./components/admin-orders-management";
import AdminProductManagment from "./components/admin-product-management";
import AdminQuantityManagment from "./components/admin-quantity-management";
import MobileCategory from "./pages/mobile-category";

const routes = [
  { path: "/", element: <HomeScreen /> },
  { path: "/login", element: <Login /> },
  { path: "/RegisterPage", element: <RegisterPage /> },
  { path: "/product/:id", element: <Product /> },
  { path: "/products", element: <Products /> },
  { path: "/products/category/:categoryName", element: <Products /> },
  { path: "/products/subcategory/:subcategoryName", element: <Products /> },
  {
    path: "/products/category/:categoryName/subcategory/:subcategoryName",
    element: <Products />,
  },
  { path: "/MobileCategory", element: <MobileCategory /> },
  { path: "/shopingcart", element: <ShoppingCart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/payment", element: <Payment /> },
  { path: "/Paymentresultfail", element: <PaymentResultFail /> },
  { path: "/paymentresultsuccess", element: <PaymentResultSuccess /> },
  {
    path: "/profile",
    element: <Profile />,
    children: [
      { index: true, element: <ProfileHome /> },
      { path: "profilehome", element: <ProfileHome /> },
      { path: "profileorder", element: <ProfieOrders /> },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { index: true, element: <AdminHome /> },
      { path: "adminhome", element: <AdminHome /> },
      { path: "adminordersmanagment", element: <AdminOrdersManagment /> },
      { path: "adminproductmanagment", element: <AdminProductManagment /> },
      { path: "adminquantitymanagement", element: <AdminQuantityManagment /> },
    ],
  },
];

export default routes;
