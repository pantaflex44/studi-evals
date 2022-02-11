import React from "react";

export default function Prestation({ content }) {
    return (
        <article className="prestation">
            <img
                src={content.illustration?.url}
                alt={content.illustration?.alt}
                lazt="loading"
            />
            <div className="prestation-price">
                {content.tarif ? content.tarif + "€" : "sur mesure"}
            </div>
            <div className="prestation-infos">
                <h4>{content.denomination[0].text}</h4>
                <p>{content.informations[0].text}</p>
            </div>
        </article>
    );
}
