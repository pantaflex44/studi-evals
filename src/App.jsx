import React, { useState, useEffect, useMemo } from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./css/_app.scss";

import { loadRoutes } from "./js/primatic";

import Page from "./components/Page";
import Layout from "./components/Layout";
import Accueil from "./pages/Accueil";
import Gallery from "./pages/Gallery";
import Cgv from "./pages/Cgv";
import MentionsLegales from "./pages/MentionsLegales";
import Prestations from "./pages/Prestations";
import Contact from "./pages/Contact";

const TransitionWrapper = ({ routes }) => {
    const location = useLocation();

    return (
        <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={250}>
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.id}
                            exact
                            path={`${route.path}`}
                            element={<Page>{route.component}</Page>}
                        />
                    ))}
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
};

export function App({ routes }) {
    const currentLocation = window.location.pathname;
    const currentPath =
        currentLocation.substring(0, currentLocation.lastIndexOf("/")) + "/";

    return (
        <HelmetProvider>
            <BrowserRouter basename={currentPath}>
                <Layout>
                    <TransitionWrapper routes={routes} />
                </Layout>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default function Loader({ prismicRoutes }) {
    const [appState, setAppState] = useState(null);

    useEffect(() => {
        loadRoutes(prismicRoutes)
            .then((routes) => {
                setAppState(<App routes={routes} />);
            })
            .catch((error) => console.log(`App error: ${error}`));
    }, []);

    return appState ? appState : <div className="pageLoader"></div>;
}

render(
    <Loader
        prismicRoutes={[
            { name: "page_daccueil", component: <Accueil /> },
            { name: "cgv", component: <Cgv /> },
            { name: "contact", component: <Contact /> },
            { name: "gallerie_de_photos", component: <Gallery /> },
            { name: "mentions_legales", component: <MentionsLegales /> },
            { name: "tarifs_et_prestations", component: <Prestations /> },
        ]}
    />,
    document.getElementById("app")
);
