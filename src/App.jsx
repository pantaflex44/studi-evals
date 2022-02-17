import React, { useState, useEffect, lazy, Suspense } from "react";

import { render, hydrate } from "react-dom";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import "./css/_app.scss";
import { removeCommonMetas } from "./js/functions";

import { loadRoutes } from "./js/primatic";

import { SpinnerRoundFilled } from "spinners-react";
import Page from "./components/Page";
import Layout from "./components/Layout";

const Accueil = lazy(() => import("./pages/Accueil"));
const Galerie = lazy(() => import("./pages/Galerie"));
const Cgv = lazy(() => import("./pages/Cgv"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const Prestations = lazy(() => import("./pages/Prestations"));
const Contact = lazy(() => import("./pages/Contact"));

export function useOnScreen(ref) {
    const [isIntersecting, setIntersecting] = useState(false);

    const observer = new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
    );

    useEffect(() => {
        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return isIntersecting;
}

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
                <Suspense
                    fallback={
                        <div className="loader">
                            <SpinnerRoundFilled
                                size={75}
                                thickness={100}
                                speed={100}
                                color="#1A374D"
                            />
                        </div>
                    }
                >
                    <Layout>
                        <TransitionWrapper routes={routes} />
                    </Layout>
                </Suspense>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export function Loader({ prismicRoutes }) {
    const [appState, setAppState] = useState(null);

    useEffect(() => {
        loadRoutes(prismicRoutes).then((routes) => {
            removeCommonMetas();
            setAppState(<App routes={routes} />);
        });
    }, []);

    return appState ? (
        appState
    ) : (
        <div className="loader">
            <SpinnerRoundFilled
                size={75}
                thickness={100}
                speed={100}
                color="#1A374D"
            />
        </div>
    );
}

const rootElement = document.getElementById("app");
const loaderElement = (
    <Loader
        prismicRoutes={[
            { name: "page_daccueil", component: <Accueil /> },
            { name: "cgv", component: <Cgv /> },
            { name: "contact", component: <Contact /> },
            { name: "gallerie_de_photos", component: <Galerie /> },
            {
                name: "mentions_legales",
                component: <MentionsLegales />,
            },
            { name: "tarifs_et_prestations", component: <Prestations /> },
        ]}
    />
);
if (rootElement.hasChildNodes()) {
    hydrate(loaderElement, rootElement);
} else {
    render(loaderElement, rootElement);
}
