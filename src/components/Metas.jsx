import React, { useContext, useMemo } from "react";
import { Helmet } from "react-helmet-async";

import CharlesCantin from "../../assets/charles-cantin.jpg";
import Favicon from "../../assets/favicon-32x32.png";

export default function Metas({ page }) {
    return useMemo(() => {
        return (
            <Helmet htmlAttributes={{ lang: page?.lang }}>
                <title>{`${page?.data.titre_de_la_page[0].text} - ${page?.data.slogan[0].text}`}</title>
                <meta
                    name="description"
                    content={page?.data.description[0].text}
                />
                <meta http-equiv="content-language" content={page?.lang} />
                <meta name="keywords" content={page?.data.mots_clefs[0].text} />
                <meta
                    name="author"
                    content={page?.data.nom_de_l_auteur[0].text}
                />
                <meta
                    name="generator"
                    content="QuickParcelProject and Prismic.io for Studi evaluation named 'ECF Front'"
                />
                <meta
                    name="publisher"
                    content={page?.data.nom_de_l_auteur[0].text}
                />
                <meta
                    property="og:site_name"
                    content={`${page?.data.titre_de_la_page[0].text} - ${page?.data.slogan[0].text}`}
                />
                <meta
                    property="og:title"
                    content={page?.data.titre_de_la_page[0].text}
                />
                <meta
                    property="og:description"
                    content={page?.data.description[0].text}
                />
                <meta
                    property="og:image"
                    content={
                        page && page?.data.image_de_fond
                            ? page.data.image_de_fond.url
                            : CharlesCantin
                    }
                />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:image:alt"
                    content={`${page?.data.titre_de_la_page[0].text} - ${page?.data.slogan[0].text}`}
                />
                <link rel="icon" type="image/x-icon" href={Favicon}></link>
                <link
                    rel="canonical"
                    href={
                        window.location.protocol +
                        "//" +
                        window.location.host +
                        window.location.pathname
                    }
                />
                <base
                    href={
                        window.location.protocol + "//" + window.location.host
                    }
                />
                <meta name="robots" content="all" />
            </Helmet>
        );
    }, [page]);
}
