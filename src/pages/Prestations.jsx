import React from "react";

import { prismicContentToHtml } from "../js/primatic";

import ContentLayout from "../components/ContentLayout";
import Prestation from "../components/Prestation";

export default function Prestations({ page }) {
    return (
        page && (
            <ContentLayout page={page}>
                <section className="prestations">
                    {page.data?.prestations?.map((prestation, idx) => (
                        <Prestation key={idx} content={prestation} />
                    ))}
                </section>
                <section>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: prismicContentToHtml(
                                page.data.contenu_de_la_page
                            ),
                        }}
                    ></div>
                </section>
            </ContentLayout>
        )
    );
}
