import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import CategoryList from "../pages/Category/CategoryList/CategoryList";
import CategoryDetails from "../pages/Category/CategoryDetails/CategoryDetails";
import Signup from "../pages/Auth/Signup/Signup";
import Login from "../pages/Auth/Login/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";

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
]);


export default router;