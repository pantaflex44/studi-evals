import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import * as styles from "../css/App.module.scss";

export default function MainMenu() {
    return (
        <nav>
            <ul className={styles.mainMenu}>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? styles.currentNavlink : styles.navlink
                        }
                    >
                        Accueil
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? styles.currentNavlink : styles.navlink
                        }
                        end
                    >
                        A propos de...
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
