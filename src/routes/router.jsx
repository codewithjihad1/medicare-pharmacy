import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Invoice from "../pages/Invoice/Invoice";
import CategoryList from "../pages/Category/CategoryList/CategoryList";
import CategoryDetails from "../pages/Category/CategoryDetails/CategoryDetails";
import Signup from "../pages/Auth/Signup/Signup";
import Login from "../pages/Auth/Login/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import UserDashboard from "../pages/Dashboard/User/UserDashboard";
import SellerDashboard from "../pages/Dashboard/Seller/SellerDashboard";
import AdminProtectedRoute from "../components/common/ProtectedRoute/AdminProtectedRoute";
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute";
import AdminHome from "../pages/Dashboard/Admin/components/AdminHome/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/components/ManageUsers/ManageUsers";
import ManageCategory from "../pages/Dashboard/Admin/components/ManageCategory/ManageCategory";
import PaymentManagement from "../pages/Dashboard/Admin/components/PaymentManagement/PaymentManagement";
import SalesReport from "../pages/Dashboard/Admin/components/SalesReport/SalesReport";
import ManageBanner from "../pages/Dashboard/Admin/components/ManageBanner/ManageBanner";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: "shop",
                Component: Shop,
            },
            {
                path: "cart",
                Component: Cart,
            },
            {
                path: "checkout",
                Component: Checkout,
            },
            {
                path: "invoice",
                Component: Invoice,
            },
            {
                path: "categories",
                Component: CategoryList,
            },
            {
                path: "category/:category",
                Component: CategoryDetails,
            },
        ],
    },
    {
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                path: "signup",
                Component: Signup,
            },
            {
                path: "login",
                Component: Login,
            },
            {
                path: "forgot-password",
                Component: ForgotPassword,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <UserDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/dashboard/seller",
        element: (
            <ProtectedRoute>
                <SellerDashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: "/dashboard/admin",
        element: (
            <AdminProtectedRoute>
                <AdminDashboard />
            </AdminProtectedRoute>
        ),
        children: [
            {
                path: "home",
                element: <AdminHome />,
            },
            {
                path: "users",
                element: <ManageUsers />,
            },
            {
                path: "categories",
                element: <ManageCategory />,
            },
            {
                path: "payments",
                element: <PaymentManagement />,
            },
            {
                path: "reports",
                element: <SalesReport />,
            },
            {
                path: "banners",
                element: <ManageBanner />,
            },
        ],
    },
]);


export default router;