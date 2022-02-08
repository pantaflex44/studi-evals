import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";

const { PRISMIC_REPO } = process.env;

export const getPage = async (id) => {
    const endpoint = prismic.getEndpoint(PRISMIC_REPO);
    const client = prismic.createClient(endpoint, { fetch });

    const doc = await client.getByID(id);
    return {
        id: doc.id,
        lang: doc.lang,
        data: doc.data,
        href: doc.href,
        published: doc.first_publication_date,
        updated: doc.last_publication_date,
    };
};

export const getPagesByType = async (type) => {
    const endpoint = prismic.getEndpoint(PRISMIC_REPO);
    const client = prismic.createClient(endpoint, { fetch });

    const doc = await client.getAllByType(type);
    if (!doc) {
        return [];
    }

    const pages = [];
    doc.map((page) => {
        pages.push({
            id: page.id,
            lang: page.lang,
            data: page.data,
            href: page.href,
            published: page.first_publication_date,
            updated: page.last_publication_date,
        });
    });

    return pages;
};

export const loadRoutes = async (docTypes) => {
    const endpoint = prismic.getEndpoint(PRISMIC_REPO);
    const client = prismic.createClient(endpoint, { fetch });

    const asyncGetPage = async (type) => {
        const doc = await client.getSingle(type.name);
        if (
            !doc ||
            !doc.data.titre_du_menu ||
            doc.data.titre_du_menu.length < 1 ||
            !doc.data.position ||
            doc.data.position < 1 ||
            !doc.data.icone_du_menu
        ) {
            return null;
        }

        return {
            id: doc.id,
            type: type.name,
            position: doc.data.position,
            title: doc.data.titre_du_menu[0].text,
            icon: doc.data.icone_du_menu.url,
            path: `/${
                doc.data.chemin && doc.data.chemin.length > 0
                    ? doc.data.chemin[0].text
                    : ""
            }`,
            href: doc.href,
            component: type.component,
        };
    };

    const promises = [];
    docTypes.forEach((type) => promises.push(asyncGetPage(type)));

    const menu = await Promise.all(promises);
    menu.sort((a, b) => a.position - b.position);

    localStorage.removeItem("prismicMenu");
    localStorage.setItem("prismicMenu", JSON.stringify(menu));

    return menu;
};

export const getMenu = () => JSON.parse(localStorage.getItem("prismicMenu"));

export const getMenuLink = (type) => {
    for (const item of getMenu()) {
        if (item.type === type) {
            return item.path;
        }
    }

    return "/";
};

export const getMenuTitle = (type) => {
    for (const item of getMenu()) {
        if (item.type === type) {
            return { title: item.title, icon: item.icon };
        }
    }

    return { title: "", icon: "" };
};

export const getPageFromPath = async (path) => {
    for (const item of getMenu()) {
        if (item.path === path) {
            return await getPage(item.id);
        }
    }

    return {};
};

export const prismicContentToHtml = (content) => {
    if (!content || content.length === 0) {
        return "";
    }

    const blocks = [];

    let prevType = "";

    for (const block of content) {
        let tags = "";

        let content = block.text ? block.text.trim() : "";

        switch (block.type) {
            case "heading1":
                tags = "<h1>$1</h1>";
                break;
            case "heading2":
                tags = "<h2>$1</h2>";
                break;
            case "heading3":
                tags = "<h3>$1</h3>";
                break;
            case "heading4":
                tags = "<h4>$1</h4>";
                break;
            case "heading5":
                tags = "<h5>$1</h5>";
                break;
            case "heading6":
                tags = "<h6>$1</h6>";
                break;
            case "paragraph":
                tags = "<p>$1</p>";
                break;
            case "o-list-item":
                tags = "<li>$1</li>";
                if (prevType !== "o-list-item") {
                    tags = "<ol>" + tags;
                }
                break;
            case "list-item":
                tags = "<li>$1</li>";
                if (prevType !== "list-item") {
                    tags = "<ul>" + tags;
                }
                break;
            case "image":
                tags = `<img ${block.url ? `src="${block.url}"` : `src="#"`} ${
                    block.alt ? `alt="${block.alt}"` : ""
                } ${
                    block.dimensions?.width
                        ? `width="${block.dimensions?.width}"`
                        : ""
                } ${
                    block.dimensions?.height
                        ? `height="${block.dimensions?.height}"`
                        : ""
                } lazy="loading" />`;
                break;
            default:
                tags = `<p>$1</p>`;
        }

        if (prevType === "o-list-item" && block.type !== "o-list-item") {
            tags = "</ol>" + tags;
        } else if (prevType === "list-item" && block.type !== "list-item") {
            tags = "</ul>" + tags;
        }
        prevType = block.type;

        text = [...content];
        if (block.spans) {
            for (const span of block.spans) {
                start = span.start;
                end = span.end;
                if (!text[span.end]) {
                    end--;
                }

                type = span.type;

                switch (type) {
                    case "hyperlink":
                        text[start] =
                            `<a href="${
                                span.data.url
                            }" rel="nopenener" title="${text
                                .slice(start, end)
                                .join("")}" ${
                                span.data?.target
                                    ? `target="${span.data?.target}"`
                                    : ""
                            }>` + text[start];
                        text[end] = text[end] + `</a>`;
                        break;
                    default:
                        text[start] = `<${type}>` + text[start];
                        text[end] = text[end] + `</${type}>`;
                }
            }
        }

        text = text.join("");
        text = tags.replace("$1", text.length > 0 ? text : "&nbsp;");
        blocks.push(text);
    }

    return blocks.join("\n");
};
