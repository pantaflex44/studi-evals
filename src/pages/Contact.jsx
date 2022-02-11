import React from "react";

import { prismicContentToHtml } from "../js/primatic";
import { sendMail } from "../js/email";

import ContentLayout from "../components/ContentLayout";
import { Helmet } from "react-helmet-async";

const handleSendClick = (e) => {
    e.preventDefault();

    sendMail(e.target);
};

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
                <section className="contactForm">
                    <div className="row">
                        <input
                            id="contactName"
                            type="text"
                            placeholder="Nom et Prénom"
                            aria-label="Nom et Prénom"
                            required
                            autoComplete={"family-name"}
                        />
                        <input
                            id="contactEmail"
                            type="email"
                            placeholder="Email"
                            aria-label="Votre adresse email"
                            required
                            autoComplete={"email"}
                        />
                    </div>
                    <div className="row">
                        <input
                            id="contactSubject"
                            type="text"
                            placeholder="Sujet"
                            aria-label="Sujet du message"
                            required
                            autoComplete={"none"}
                        />
                    </div>
                    <div className="row">
                        <textarea
                            id="contactMessage"
                            rows="5"
                            placeholder="Message"
                            aria-label="Message"
                            required
                            autoComplete={"none"}
                        ></textarea>
                    </div>
                    <div className="row">
                        <button className="btn" onClick={handleSendClick}>
                            envoyer le message
                        </button>
                    </div>
                    <div className="row">
                        <p>
                            <small>
                                Pour limiter les spams, le formualaire reste
                                désactivé 60s après l'envoie du message.
                            </small>
                        </p>
                    </div>
                </section>
            </ContentLayout>
        )
    );
}
