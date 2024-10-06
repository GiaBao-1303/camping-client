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

        let rts;

        if (!isLayout) {
            rts = (
                <Route key={key} path={route.path} element={<Element />}>
                    {route.children && handleMapChildren(route.children)}
                </Route>
            );
        } else {
            rts = (
                <Route key={key} path={route.path} element={<Layout />}>
                    <Route path={route.path} element={<Element />} />
                    {route.children && handleMapChildren(route.children)}
                </Route>
            );
        }

        return Protected ? (
            <Route path={route.path} key={key} element={<Protected />}>
                {rts}
            </Route>
        ) : (
            rts
        );
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
