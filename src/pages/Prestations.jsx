import React from "react";

import * as styles from "../css/App.module.scss";

export default function Prestations({ page }) {
    return (
        page && (
            <>
                <p>{page.data.titre_de_la_page[0].text}</p>
            </>
        )
    );
}
