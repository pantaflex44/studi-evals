import React from "react";

export default function MentionsLegales({ page }) {
    return (
        page && (
            <>
                <p>{page.data.titre_de_la_page[0].text}</p>
            </>
        )
    );
}
