import React from "react";

import * as styles from "../css/App.module.scss";

import MainMenu from "./MainMenu";

export default function Layout({ children }) {
    return (
        <>
            <header>
                <MainMenu />
            </header>
            <main>{children}</main>
        </>
    );
}
