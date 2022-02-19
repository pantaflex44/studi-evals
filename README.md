# Charles Cantin - Photographe



![](./src/assets/favicon-32x32.png)

Projet de l'évaluation  ECF Front: Charles Cantin<br />

<br />
Charles Cantin, une personne de votre entourage, est passionné par la photographie.<br />
Même s’il pratique en amateur, son talent est reconnu et beaucoup font appel à lui pour immortaliser
leurs événements.<br />
Pour passer à la vitesse supérieure et peut-être vivre de cette activité, il désire pouvoir se construire un
portfolio sous la forme d’un site web. Et comme il a appris que vous étiez actuellement en formation pour
devenir développeur, il fait appel à vous.<br />
Charles voudrait que vous exploitiez son logo, qu’un ami a conçu (voir annexes en fin de document)<br />
Pour l’arborescence de son site, il a pensé à 4 pages :<br /><br />
- Une page d’accueil :
    - Charles aimerait qu’une image prenne toute la taille de l’écran.
    - Le texte “Charles Cantin - Photographe” devra être centré verticalement et
horizontalement.
- Une page galerie :
    - Ici, nous retrouverons les photographies que Charles souhaiterait mettre en valeur.
    - Chaque image fera partie d’une catégorie (voir annexes en fin de document).
    - Un système de filtre dynamique doit permettre d’afficher les photos d’une catégorie en
particulier sans avoir à recharger la page.
- Une page “tarifs et prestations” :
    - Chaque prestation possède un titre, une petite description et un tarif (voir annexes en fin
de document).
- Une page “contact” :
    - Un formulaire fonctionnel doit permettre de le contacter. Vous pouvez utiliser un service
gratuit comme le plan starter de https://formspree.io/, ou profiter de netlify forms si vous
choisissez cet hébergeur.<br />

Développer la partie front-end d’une application web
Depuis chacune des pages, une barre de navigation devra être disponible avec le menu ainsi que les
icônes Facebook et Instagram (pour un lien vers son profil sur les réseaux sociaux à l’avenir).<br />
Tout contenu devra être modifiable facilement par Charles à l’aide d’un CMS.
Pour qu’il puisse apprécier le rendu du site avant de pouvoir le personnaliser, vous pouvez récupérer les
images sur Pixabay (https://pixabay.com/fr/).

## Objectif de l’évaluation

L’évaluation d’entraînement en cours de formation que vous allez réaliser permet de vous entraîner à
l’évaluation en cours de formation du titre professionnel, en bénéficiant de la correction personnalisée
du correcteur, afin de vous améliorer. Les résultats de cette évaluation d’entraînement pourront être
pris en compte si vous ne validez pas certaines compétences lors du passage de votre ECF.<br />
Si vous êtes
dans ce cas, nous ferons figurer cette évaluation dans votre livret d’évaluation, qui sera donc remis à
votre jury le jour des épreuves du titre professionnel accompagné de votre évaluation d’entraînement
et du sujet initial.
Nous vous demandons de vous mettre en situation d’examen, cette évaluation est inspirée de sujets
réels.

## Projet

**Nom**: Christophe LEMOINE<br />
**Identifiant**: GDDWWMECFENTRIII1A

**Nom du projet**: Charles Cantin - Photographe<br />
**Lien Github**: https://github.com/pantaflex44/studi-evals/tree/eval3<br />
**URL du projet Front**: https://pantaflex44.me/eval3/<br />
**URL du projet Back**: https://charlescantin.prismic.io/documents/working?l=fr-fr<br />

Tous les documents annexes sont disponibles dans le dossier **projet** à la racine de l'application.

![](./src/assets/charles-cantin.jpg)

## Compétences du référentiel couvertes par le projet

Développer la partie front-end d’une application web ou web mobile en intégrant les recommadations de sécurité

## Courte description du projet

L’objectif demandé, est la réalisation de la partie Front d’un site vitrine (portfolio) pour un photographe particulier nommé Charles Cantin. Cette application devra se reposer sur un Backend disponible et fonctionnel auquel nous confierons la gestion du contenu. Un CMS Headless fera parfaitement l’affaire.<br />
Pour cette réalisation, il m’est demandé d’effectuer une petite étude UI/UX pour laquelle je partage la chartre graphique, et les maquettes / wireframes (version mobile et desktop) mettant en valeur l’interface de la future vitrine web. Par ailleurs, les polices d’écritures employées devront être indiquées dans un document annexe.

## Base du projet

Pour développer ce projet, j'utilise une base disponible sur mon Github, regroupant Parcel, Sass, et ReactJs:

**QuickParcelProject**: https://github.com/pantaflex44/QuickParcelProject

Ce projet est développé avec les technologies: HTML - SASS - Javascript - ReactJS. La partie Back-End est supportée par un CMS Headless (Prismic.io).

## Installation et Utilisations

Avant d'exploiter ce projet, il est nécessaire d'avoir préalablement installé NodeJS et son gestionnaire de paquet NPM. Pour vérifier leurs présences sur votre système, il suffit de vérifier les versions présentes:

```bash
node -v
npm -v
```

Pour utiliser le projet en local, il est nécessaire de commencer par son téléchargement sur votre poste:

***ATTENTION**: toutes les commandes indiquées sont adaptées aux systèmes Linux. A modifier pour votre OS préféré.*

```bash
mkdir LeProjet
cd LeProjet
git clone https://github.com/pantaflex44/studi-evals.git .
```

### Premiers pas

Dans un premier temps il est nécessaire d'installer l'ensemble des dépendances du projet:

```bash
npm install
```

Une fois le téléchargement terminé, retrouvez les instructions d'utilisations ci-dessous.

### Travailler en local

Pour visualiser vos modifications ou tester rapidement le projet en local, un serveur web basé sur Parcel vous est proposé.


```bash
npm run dev
```

La commande ci-dessous créée un serveur web disponible à l'URL: http://localhost:1234 (un onglet s'ouvre automatiquement dans votre navigateur)

### Compiler pour déployer

La commande suivante permet la compilation du projet pour son probable déploiement sur votre serveur distant.


```bash
npm run build
```

Un répertoire nommé **dist** est créé et contient, une fois la compilation terminée, l'ensemble des fichiers rangés dans leurs dossiers respectifs.

Pour déployer l'application Web, un fichier *.htaccess* est aussi ajouté au coté du fichier *index.html*. La présence de *.htaccess* vous permet de déployer les fichiers directement sur un serveur Apache. Compatible **React-Router-Dom** et les sécurités liées aux **CORS**.


### Tester sa compilation

```bash
npm run serve
```

Cette commande créé un nouveau serveur Web statique à l'adresse http://localhost:8080 pour distribuer le résultat de votre dernière compilation.
Un nouvel onglet s'ouvre automatiquement dans votre navigateur préféré.


### Nettoyer les fichiers compilés et pré-compilés.

```bash
npm run clean
```

## Author and Copyright

Christophe LEMOINE

pantaflex at tuta point io

Licence: MIT
