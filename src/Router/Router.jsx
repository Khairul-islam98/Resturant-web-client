import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../MainLayout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import PrivateRoute from "../Providers/PrivateRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "../Providers/AdminRoute";
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItems from "../Pages/Dashboard/UpdateItems/UpdateItems";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/menu',
                element: <Menu />
            },
            {
                path: '/order/:category',
                element: <Order />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: 'userHome',
                element: <UserHome />
            },
            {
                path: 'cart',
                element: <PrivateRoute><Cart /></PrivateRoute>
            },
            {
                path: 'payment',
                element: <Payment />
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory />
            },

            // Admin Route
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome /></AdminRoute>
            },
            {
                path: 'users',
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: 'addItems',
                element: <AdminRoute><AddItems /></AdminRoute>
            },
            {
                path: 'manageItems',
                element: <AdminRoute><ManageItems /></AdminRoute>
            },
            {
                path: 'updateItems/:id',
                element: <AdminRoute><UpdateItems></UpdateItems></AdminRoute>,
                loader: ({params}) => fetch(`http://localhost:5001/menu/${params.id}`)
            }
        ]
    }
])

export default router;