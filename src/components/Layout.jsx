import React, { useState, cloneElement } from "react";

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
