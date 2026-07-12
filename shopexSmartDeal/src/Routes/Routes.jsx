import { createBrowserRouter } from "react-router";
import Root from "../Layout/RootLayout";
import RootLayout from "../Layout/RootLayout";
import Home from "../Components/Home/Home";
import AllProducts from "../Components/AllProducts/AllProducts";
import Regsiter from "../Components/Register/Regsiter";
import Login from "../Components/Login/Login";

const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            { path:'/allProducts', Component: AllProducts },
            { path:'/register', Component:Regsiter },
            { path:'/login', Component:Login},
        ]
    }
])
export default router;