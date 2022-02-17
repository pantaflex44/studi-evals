export const wait = (duration) => {
    const t = Date.now();

    while (true) {
        if (Date.now() - t > duration) {
            return true;
        }
    }
};

export const removeCommonMetas = () => {
    document.querySelector(`title`).remove();
    document.querySelector(`[name="description"]`).remove();
    document.querySelector(`[http-equiv="content-language"]`).remove();
    document.querySelector(`[name="keywords"]`).remove();
    document.querySelector(`[name="author"]`).remove();
    document.querySelector(`[name="generator"]`).remove();
    document.querySelector(`[name="publisher"]`).remove();
    document.querySelector(`[property="og:site_name"]`).remove();
    document.querySelector(`[property="og:title"]`).remove();
    document.querySelector(`[property="og:description"]`).remove();
    document.querySelector(`[property="og:image"]`).remove();
    document.querySelector(`[property="og:url"]`).remove();
    document.querySelector(`[name="twitter:card"]`).remove();
    document.querySelector(`[name="twitter:image:alt"]`).remove();
    document.querySelector(`[rel="icon"]`).remove();
    document.querySelector(`[name="robots"]`).remove();
};
