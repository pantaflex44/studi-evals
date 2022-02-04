import React, { useContext } from "react";

import * as styles from "../css/App.module.scss";

import Metas from "./Metas";
import MainMenu from "./MainMenu";

export default function Layout({ props, children }) {
    return (
        <>
            <header>
                <Metas />
                <MainMenu />
            </header>
            <main {...props}>{children}</main>
        </>
    );
}
