import React, { createContext, StrictMode } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./css/_app.scss";
import * as styles from "./css/App.module.scss";

import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";

const TransitionWrapper = () => {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={250}>
                <Routes>
                    <Route exact path="/" element={<Index />} />
                    <Route exact path="/about" element={<About />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};

export const PageContext = createContext({});

export default function App() {
    const currentLocation = window.location.pathname;
    const currentPath =
        currentLocation.substring(0, currentLocation.lastIndexOf("/")) + "/";

    const pageInfos = { author: "Christophe LEMOINE" };

    return (
        <HelmetProvider>
            <BrowserRouter basename={currentPath}>
                <PageContext.Provider value={pageInfos}>
                    <Layout>
                        <TransitionWrapper />
                    </Layout>
                </PageContext.Provider>
            </BrowserRouter>
        </HelmetProvider>
    );
}

render(<App />, document.getElementById("app"));
