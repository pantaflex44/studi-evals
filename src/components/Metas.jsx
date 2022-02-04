import React, { useContext, useMemo } from "react";
import { Helmet } from "react-helmet-async";

import QuickParcelProjectLogo from "../../assets/QuickParcelProject.png";

import { PageContext } from "../App";

export default function Metas() {
    const Page = useContext(PageContext);

    return useMemo(() => {
        return (
            <Helmet htmlAttributes={{ lang: "fr-FR" }}>
                <title>QuickParcelProject</title>
                <meta
                    name="description"
                    content="A quick project maker with Parcel, Sass, React and Jest"
                />
                <meta http-equiv="content-language" content="fr-FR" />
                <meta
                    name="keywords"
                    content="parcel,sass,react,jest,project"
                />
                <meta name="author" content={Page.author} />
                <meta name="generator" content="QuickParcelProject" />
                <meta name="publisher" content="QuickParcelProject" />
                <meta property="og:site_name" content="QuickParcelProject" />
                <meta property="og:title" content="QuickParcelProject" />
                <meta
                    property="og:description"
                    content="A quick project maker with Parcel, Sass, React and Jest"
                />
                <meta property="og:image" content={QuickParcelProjectLogo} />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:image:alt"
                    content={QuickParcelProjectLogo}
                />
                <link
                    rel="icon"
                    type="image/x-icon"
                    href={QuickParcelProjectLogo}
                ></link>
                <link
                    rel="canonical"
                    href={window.location.href.split(/[\\/]/).pop()}
                />
                <base href={window.location.href.split(/[\\/]/).pop()} />
                <meta name="robots" content="all" />
            </Helmet>
        );
    }, [Page]);
}
