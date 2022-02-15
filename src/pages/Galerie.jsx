import React, { useEffect, useLayoutEffect, useState } from "react";

import { getPagesById, prismicContentToHtml } from "../js/primatic";

import ContentLayout from "../components/ContentLayout";

export default function Galerie({ page }) {
    const [albums, setAlbums] = useState([]);
    const [albumsSelection, setAlbumsSelection] = useState([]);
    const minMappedPhotosCount = 4;

    useEffect(() => {
        page.data.albums_photos.map((item) => {
            const albumPromised = getPagesById(item.album.id);
            albumPromised.then((album) => {
                setAlbums((albums) => [...albums, album]);
                setAlbumsSelection((albumsSelection) => [
                    ...albumsSelection,
                    album,
                ]);
            });
        });
    }, []);

    const handleCategorieChange = (e) => {
        e.preventDefault();

        if (!e.target.value || e.target.value === "") {
            setAlbumsSelection([...albums]);
        } else {
            const album = JSON.parse(e.target.value);

            setAlbumsSelection([album]);
        }
    };

    return (
        page && (
            <ContentLayout page={page}>
                <div className="categories">
                    <span>
                        Sélectionner une catégorie pour en voir tout le contenu
                    </span>
                    <div className="selectContainer">
                        <select onChange={handleCategorieChange}>
                            <option value="" defaultValue>
                                Toutes
                            </option>
                            {albums.map((album, idx) => (
                                <option key={idx} value={JSON.stringify(album)}>
                                    {album.data.nom_de_l_album[0].text}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <section className="gallery">
                    {albumsSelection.map((album) => (
                        <article key={album.id}>
                            <div className="album">
                                <h4>
                                    {album.data.nom_de_l_album[0].text}
                                    <br />
                                    <small>
                                        {albumsSelection.length === 1
                                            ? album.data.photo.length
                                            : minMappedPhotosCount}{" "}
                                        / {album.data.photo.length} photos
                                    </small>
                                </h4>

                                <div className="photo">
                                    {album.data.photo &&
                                        album.data.photo
                                            .slice(
                                                0,
                                                albumsSelection.length === 1
                                                    ? album.data.photo.length
                                                    : minMappedPhotosCount
                                            )
                                            .map((photo, idx) => (
                                                <figure key={idx}>
                                                    <img
                                                        src={photo.image.url}
                                                        alt={
                                                            photo.image.alt
                                                                ? photo.image
                                                                      .alt
                                                                : ""
                                                        }
                                                        lazy="loading"
                                                    />
                                                    <figcaption
                                                        dangerouslySetInnerHTML={{
                                                            __html: prismicContentToHtml(
                                                                photo.description
                                                            ),
                                                        }}
                                                    />
                                                </figure>
                                            ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            </ContentLayout>
        )
    );
}
