import React, { useState, useEffect } from "react";

export default function Accueil({ page }) {
    return (
        page && (
            <div
                className="home"
                style={{
                    backgroundImage: `url(${page.data.image_de_fond.url})`,
                }}
            >
                <div>
                    <h1>{page.data.titre_de_la_page[0].text}</h1>
                    <h2>{page.data.slogan[0].text}</h2>
                </div>
            </div>
        )
    );
}
