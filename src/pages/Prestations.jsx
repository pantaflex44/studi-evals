import React, { lazy, Suspense } from "react";

import { prismicContentToHtml } from "../js/primatic";

import Prestation from "../components/Prestation";

export default function Prestations({ page }) {
    console.log(page.data);
    return (
        page && (
            <article style={{ marginTop: "3em" }}>
                <div className="page-title">{page.data.slogan[0].text}</div>
                <section className="container">
                    <div className="content">
                        <h1>{page.data.titre_de_la_page[0].text}</h1>
                        <h3>{page.data.description[0].text}</h3>
                        <div className="prestations">
                            {page.data?.prestations?.map((prestation, idx) => (
                                <Prestation key={idx} content={prestation} />
                            ))}
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: prismicContentToHtml(
                                    page.data.contenu_de_la_page
                                ),
                            }}
                        ></div>
                    </div>
                </section>
            </article>
        )
    );
}
