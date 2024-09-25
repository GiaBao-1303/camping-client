import React from "react";
import Footer from "./footer";
import Header from "./header";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
    return (
        <main>
            <Header />
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </main>
    );
};

export default DefaultLayout;
