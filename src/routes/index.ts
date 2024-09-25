import { DefaultLayout } from "../layouts";
import {
    ManageOrder,
    ManageUser,
    HomePage,
    NotFound,
    SignIn,
    SignUp,
} from "../pages";
import AdminPage from "../pages/admin";
import { IRouters } from "../interfaces/router";
import PrivateRoutes from "./PrivateRoutes";

export const publicRouter: IRouters[] = [
    {
        path: "/",
        layout: DefaultLayout,
        element: HomePage,
    },
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
    // anothor routes ...

    // NotFound Page
    {
        path: "*",
        layout: null,
        element: NotFound,
    },
];

export const privateRouter: IRouters[] = [
    // /admin/orders
    // /admin/users
    {
        path: "/admin",
        layout: DefaultLayout,
        element: AdminPage,
        Protected: PrivateRoutes,
        children: [
            {
                path: "orders",
                element: ManageOrder,
            },
            {
                path: "users",
                element: ManageUser,
            },
        ],
    },
];
