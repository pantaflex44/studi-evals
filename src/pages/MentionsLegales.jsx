import React from "react";

import { prismicContentToHtml } from "../js/primatic";

import ContentLayout from "../components/ContentLayout";

export default function MentionsLegales({ page }) {
    return (
        page && (
            <ContentLayout page={page}>
                <section>
                    <img
                        src={page.data.image_de_fond.url}
                        alt={
                            page.data.image_de_fond.alt
                                ? page.data.image_de_fond.alt
                                : ""
                        }
                        lazy={"loading"}
                    />
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
