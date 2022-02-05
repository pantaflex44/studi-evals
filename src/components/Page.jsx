import React, { cloneElement, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import * as styles from "../css/App.module.scss";

import { getPageFromPath } from "../js/primatic";

import Metas from "./Metas";

export default function Page({ children }) {
    const location = useLocation();

    const [pageState, setPageState] = useState(null);

    useEffect(() => {
        getPageFromPath(location.pathname).then((page) => setPageState(page));
    }, []);

    return useMemo(() => {
        return (
            <div className="page" id={pageState?.id}>
                <Metas page={pageState} />
                {cloneElement(children, { page: pageState })}
            </div>
        );
    }, [pageState]);
}
