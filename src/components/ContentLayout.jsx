import React from "react";

export default function ContentLayout({ page, children }) {
    return (
        page && (
            <div className="contentLayout">
                <div className="contentLayout-title">
                    {page.data.slogan[0].text}
                </div>
                <div className="container">
                    <div className="content">
                        <h1>{page.data.titre_de_la_page[0].text}</h1>
                        <h3>{page.data.description[0].text}</h3>
                        {children}
                    </div>
                </div>
            </div>
        )
    );
}
