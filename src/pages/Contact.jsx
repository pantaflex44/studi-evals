import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

import { prismicContentToHtml } from "../js/primatic";

import ContentLayout from "../components/ContentLayout";
import ContactForm from "../components/ContactForm";

export default function Contact({ page }) {
    return (
        page && (
            <ContentLayout page={page}>
                <Helmet>
                    <script
                        src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"
                        type="text/javascript"
                        defer
                    ></script>
                </Helmet>
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
                <ContactForm />
            </ContentLayout>
        )
    );
}
