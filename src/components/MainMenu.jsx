import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import * as styles from "../css/App.module.scss";

import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";

import { getMenu } from "../js/primatic";

export default function MainMenu() {
    return (
        <nav>
            <ul className={styles.mainMenu}>
                {getMenu().map((item, i) => (
                    <li key={i}>
                        <NavLink
                            to={`${item.path}`}
                            title={item.title}
                            className={({ isActive }) =>
                                isActive
                                    ? styles.currentNavlink
                                    : styles.navlink
                            }
                        >
                            <span>
                                <div
                                    className={styles.menuIcon}
                                    style={{
                                        backgroundImage: `url(${item.icon})`,
                                    }}
                                    title={item.title}
                                />{" "}
                                {item.title}
                            </span>
                        </NavLink>
                    </li>
                ))}
                <li>
                    <a href="#" target="_blank" title="Mon compte Facebook">
                        <IoLogoFacebook />
                    </a>
                </li>
                <li>
                    <a href="#" target="_blank" title="Mon compte Instagram">
                        <IoLogoInstagram />
                    </a>
                </li>
            </ul>
        </nav>
    );
}
