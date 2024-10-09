import { DefaultLayout } from "../layouts";
import {
    ManageProduct,
    HomePage,
    NotFound,
    SignIn,
    SignUp,
    Dashboard,
    ManageUser,
} from "../pages";
import { IRouters } from "../interfaces/router";
import { RedirectIfLoggedIn } from "../components";
import { Outlet } from "react-router-dom";
import CartPage from "../pages/cart";
import AdminLayout from "../layouts/AdminLayout";
import { Fragment } from "react/jsx-runtime";
import CreateProduct from "../pages/admin/createProduct";
import EditProduct from "../pages/admin/editProduct";
import RequireAuth from "../components/auth/RequireAuth";
import RequireAdmin from "../components/auth/RequireAdmin";

export const publicRouter: IRouters[] = [
    {
        path: "/",
        layout: DefaultLayout,
        element: HomePage,
    },
    {
        path: "",
        layout: null,
        element: Outlet,
        Protected: RedirectIfLoggedIn,
        children: [
            {
                path: "/sign-in",
                layout: null,
                element: SignIn,
                children: null,
            },
            {
                path: "/sign-up",
                layout: null,
                element: SignUp,
                children: null,
            },
        ],
    },
    {
        path: "/cart",
        layout: null,
        Protected: RequireAuth,
        element: CartPage,
        children: null,
    },

    {
        path: "*",
        layout: null,
        element: NotFound,
    },
];

export const privateRouter: IRouters[] = [
    {
        path: "admin",
        layout: AdminLayout,
        Protected: RequireAdmin,
        element: Outlet,
        children: [
            {
                path: "",
                element: Dashboard,
            },
            {
                path: "products",
                element: ManageProduct,
            },
            {
                path: "products/create",
                element: CreateProduct,
            },
            {
                path: "products/:productId/edit",
                element: EditProduct,
            },
            {
                path: "users",
                element: ManageUser,
            },
            {
                path: "orders",
                element: Fragment,
            },
            {
                path: "reports",
                element: Fragment,
            },
            {
                path: "settings",
                element: Fragment,
            },
        ],
    },
];
