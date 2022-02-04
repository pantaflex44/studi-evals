import React, { useContext, useMemo } from "react";

import * as styles from "../css/App.module.scss";
import QuickParcelProjectLogo from "../../assets/QuickParcelProject.png";

import { PageContext } from "../App";

export default function Index() {
    const Page = useContext(PageContext);

    return useMemo(() => {
        return (
            <div className="page" style={{ marginTop: "3em" }}>
                <h1 className={styles.title}>
                    <img
                        src={QuickParcelProjectLogo}
                        alt="QuickParcelProject"
                    />
                    QuickParcelProject with Parcel, Sass, React and Jest
                </h1>
                <p
                    style={{
                        fontSize: "small",
                        margin: "1em",
                        textAlign: "center",
                    }}
                >
                    Du bist ein koderz
                </p>
            </div>
        );
    }, [Page]);
}
