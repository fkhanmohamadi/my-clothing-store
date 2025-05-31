import Checkout from "./pages/checkout";
import HomeScreen from "./pages/home";
import HomeManagment from "./pages/home-managment";
import Login from "./pages/login";
import OrdersManagment from "./pages/orders-management";
import Payment from "./pages/payment";
import PaymentResult from "./pages/payment-result-fail";
import PaymentResultSuccess from "./pages/payment-result-success";
import Product from "./pages/product";
import ProductManagment from "./pages/product-management";
import Products from "./pages/products";
import QuantityManagment from "./pages/quantity-management";

const routes=[
    {path:"/" ,element:<HomeScreen />},
    {path:"/login" ,element:<Login />},
    {path:"/homemanagment" ,element:<HomeManagment />},
    {path:"/ordersmanagment" ,element:<OrdersManagment />},
    {path:"/productmanagment" ,element:<ProductManagment />},
    {path:"/quantitymanagement" ,element:<QuantityManagment />},
    {path:"/payment" ,element:<Payment />},
    {path:"/product" ,element:<Product />},
    {path:"/products" ,element:<Products />},
    {path:"/checkout" ,element:<Checkout />},
    {path:"/paymentresult" ,element:<PaymentResult />},
    {path:"/paymentresultsuccess" ,element:<PaymentResultSuccess />},
]

export default routes;