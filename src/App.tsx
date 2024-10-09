import { Route, Routes } from "react-router-dom";
import { privateRouter, publicRouter } from "./routes";
import { IRouters } from "./interfaces/router";

function App() {
    const handleMapChildren = (routes: IRouters[]) => {
        return routes.map((route, ix) => {
            return handleLayout(route, ix);
        });
    };

    const handleLayout = (route: IRouters, key: any) => {
        const Element = route.element;
        const Layout = route.layout;
        const Protected = route.Protected;

        const isLayout = !!Layout;

        if (isLayout && Protected) {
            return (
                <Route key={key} path={route.path} element={<Protected />}>
                    <Route element={<Layout />}>
                        <Route index path={route.path} element={<Element />} />
                        {route.children && handleMapChildren(route.children)}
                    </Route>
                </Route>
            );
        } else if (isLayout) {
            return (
                <Route key={key} path={route.path} element={<Layout />}>
                    <Route element={<Element />} />
                    {route.children && handleMapChildren(route.children)}
                </Route>
            );
        } else {
            return (
                <Route key={key} path={route.path} element={<Element />}>
                    {route.children && handleMapChildren(route.children)}
                </Route>
            );
        }
    };

    return (
        <Routes>
            {privateRouter.map((route, ix) => {
                return handleLayout(route, ix);
            })}

            {publicRouter.map((route, ix) => {
                return handleLayout(route, ix);
            })}
        </Routes>
    );
}

export default App;
