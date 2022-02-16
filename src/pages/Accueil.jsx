import React from "react";

import { prismicContentToHtml } from "../js/primatic";

export default function Accueil({ page }) {
    return (
        page && (
            <div>
                <section className="home" lazy="loading">
                    <img
                        src={page.data.image_de_fond.url}
                        alt={page.data.nom_de_l_auteur[0].text}
                    />
                    <article className="header">
                        <h1>{page.data.titre_de_la_page[0].text}</h1>
                        <h2>{page.data.slogan[0].text}</h2>
                    </article>
                </section>
                <section className="container">
                    <article
                        className="content"
                        dangerouslySetInnerHTML={{
                            __html: prismicContentToHtml(
                                page.data.contenu_de_la_page
                            ),
                        }}
                    ></article>
                </section>
            </div>
        )
    );
}
