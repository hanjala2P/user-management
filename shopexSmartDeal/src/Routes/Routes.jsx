import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Components/Home/Home";
import AllProducts from "../Components/AllProducts/AllProducts";
import Regsiter from "../Components/Register/Regsiter";
import Login from "../Components/Login/Login";
import MyBids from "../Components/MyBids/MyBids";
import MyProducts from "../Components/MyProducts/MyProducts";
import ProductDetails from "../Components/ProdcutDetails/ProductDetails";
import PrivetRoutes from "./PrivetRoutes";

const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            { path:'/allProducts', element:<PrivetRoutes><AllProducts></AllProducts></PrivetRoutes> },
            { path:'/register', Component:Regsiter },
            { path:'/login', Component:Login},
            { path:'/myBids', element:<PrivetRoutes><MyBids></MyBids></PrivetRoutes>},
            { path:'/myProducts', element:<PrivetRoutes><MyProducts></MyProducts></PrivetRoutes>},
            { path: '/productDetails/:id', loader: ({params}) => fetch(`http://localhost:3000/latestProducts/${params.id}`),element: <PrivetRoutes><ProductDetails></ProductDetails></PrivetRoutes>
}
        ]
    }
])
export default router;