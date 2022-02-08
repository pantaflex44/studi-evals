import React from "react";

import { prismicContentToHtml } from "../js/primatic";

export default function Accueil({ page }) {
    return (
        page && (
            <article>
                <section
                    className="home"
                    style={{
                        backgroundImage: `url(${page.data.image_de_fond.url})`,
                    }}
                >
                    <div>
                        <h1>{page.data.titre_de_la_page[0].text}</h1>
                        <h2>{page.data.slogan[0].text}</h2>
                    </div>
                </section>
                <section className="container">
                    <div
                        className="content"
                        dangerouslySetInnerHTML={{
                            __html: prismicContentToHtml(
                                page.data.contenu_de_la_page
                            ),
                        }}
                    ></div>
                </section>
            </article>
        )
    );
}
