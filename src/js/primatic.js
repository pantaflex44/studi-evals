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
