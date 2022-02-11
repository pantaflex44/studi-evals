import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";

import { getMenu } from "../js/primatic";

export default function MainMenu({ currentLocation }) {
    const [menuState, setMenuState] = useState(false);

    const handleMenuClick = (e) => {
        e.preventDefault();
        setMenuState((menuState) => !menuState);
    };

    const handleMenuLinkClick = (e) => {
        setMenuState(false);
    };

    return (
        <>
            <div
                className={
                    menuState ? "menu-burger menu-burger-opened" : "menu-burger"
                }
                onClick={handleMenuClick}
            >
                <span></span>
                <span></span>
                <span></span>
                <span>Naviguer sur le site</span>
            </div>
            <nav id="menu" className={menuState ? "menu menu-opened" : "menu"}>
                <ul>
                    {getMenu().map((item, i) => (
                        <li key={i}>
                            <NavLink
                                to={`${item.path}`}
                                title={item.title}
                                className={({ isActive }) =>
                                    isActive ? "menu_current-link" : ""
                                }
                                onClick={handleMenuLinkClick}
                            >
                                {item.title}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <a href="#" target="_blank" title="Mon compte Facebook">
                            <IoLogoFacebook />
                        </a>
                        <a
                            href="#"
                            target="_blank"
                            title="Mon compte Instagram"
                        >
                            <IoLogoInstagram />
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
}
