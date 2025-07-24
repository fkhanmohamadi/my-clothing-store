import Checkout from "./pages/checkout";
import HomeScreen from "./pages/home";
import HomeManagment from "./pages/home-managment";
import Login from "./pages/login";
import RegisterPage from "./pages/register";
import OrdersManagment from "./pages/orders-management";
import Payment from "./pages/payment";
import PaymentResult from "./pages/payment-result-fail";
import PaymentResultSuccess from "./pages/payment-result-success";
import Product from "./pages/product";
import ProductManagment from "./pages/product-management";
import Products from "./pages/products";
import ShoppingCart from "./pages/cart";
import Profile from "./pages/profile";
import QuantityManagment from "./pages/quantity-management";
import ProfileHome from "./components/profile-home";
import ProfieOrders from "./components/profile-orders";

const routes = [
  { path: "/", element: <HomeScreen /> },
  { path: "/login", element: <Login /> },
  { path: "/RegisterPage", element: <RegisterPage /> },
  { path: "/homemanagment", element: <HomeManagment /> },
  { path: "/ordersmanagment", element: <OrdersManagment /> },
  { path: "/productmanagment", element: <ProductManagment /> },
  { path: "/quantitymanagement", element: <QuantityManagment /> },
  { path: "/product/:id", element: <Product /> },
  { path: "/products", element: <Products /> },
  { path: "/products/category/:categoryName", element: <Products /> },
  { path: "/products/subcategory/:subcategoryName", element: <Products /> },
  {
    path: "/products/category/:categoryName/subcategory/:subcategoryName",
    element: <Products />,
  },
  { path: "/shopingcart", element: <ShoppingCart /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/payment", element: <Payment /> },
  { path: "/paymentresult", element: <PaymentResult /> },
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
];

export default routes;
