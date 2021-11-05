# **Studi**
## Evaluation numéro 1
<br>

### Créer un site web avec HTML, CSS et Bootstrap
**Compétence visée**

Réaliser une interface utilisateur web statique et adaptable
<br>

### Contenu de l'évaluation

**Livrable attendu pour l’examen de ce bloc**

Un site internet présente de nombreux intérêts pour une association, surtout en termes de visibilité.
Alors une association vous demande vos services dans la création d'un site vitrine (c’est à vous de
choisir une association, qu’elle soit réelle ou fictive, l’important sera votre code).
Un dépôt contenant le code source de votre rendu.
Contexte du projet
Un site internet présente de nombreux intérêts pour une association, surtout en termes de visibilité (c’est
à vous de choisir une association, qu’elle soit réelle ou fictive, l’important sera votre code).

Le site devra au minimum contenir 2 pages :
- Une page relative à l’association.
- Une page publicitaire des événements à l'échelle national (Vous choisissez le thème de l’événement, la
date, les détails).

Bien entendu le site devra être responsive et à la demande du client l'interface devra être pensée mobile
first !

**Modalités Pédagogiques**

<u>Modalités / Restrictions :</u>
1. Réalisation de l'interface en mobile first et utilisation des médias queries pour la rendre
adaptable a tous les formats d'écran.
2. Un dépôt git avec des commit réguliers.

<u>Barème et critères d’évaluation</u>
1. Interface utilisateur claire et bien pensée (4 points).
2. Structure sémantique html et utilisation des méta pour optimiser le référencement (4 points).
3. Intégration mobile first (4 points).
4. Utilisation de git / branch / commit réguliers avec des message clairs et concis (5 points)
5. Déploiement de la réalisation en ligne (3 points)

<hr>

### Ma proposition
#### <b><u>ATTENTION</u></b>: Site Internet Factice. Seulement proposé pour l'éxercice.
<br><br>


**Description du projet**

![https://pantaflex44.github.io/studi-evals/](./images/og.banner2.png)

Démonstration:
https://pantaflex44.github.io/studi-evals/

Après avoir recherché la liste des associations rattachées à la ville de Couëron (44 - Loire Atlantique), j'ai choisi celle qui se rapprochait d'un de mes centres d'intérets: *Marche randonnée couëronnaise*.
Après de nouvelles recherches, cette association possède déjà un site web mais au design plutôt ancien. Il m'a donc paru intéressant, pour eux comme pour moi, de leur proposer ma contribution pour en réaliser un autre. Par respect pour leur travail, je reprends la structure et les informations du site existant, tout en essayant de *moderniser son aspect visuel et technique*, en le rendant notamment, *mobile first*

Pour commencer, j'ai navigué sur le site existant en prenant note de la structure et de l'organisation des informations. J'ai relevé les points que je pense importants, et les points que je pense modifier.

Site existant: http://couerando.free.fr/

Une fois fait, je commence à réfléchir à l'aspect visuel que je souhaite donner à la future interface. Je me base sur le cahier des charges de l'évaluation d'entraînement, c'est à dire, l'utilisation des technologie HTML5 / CSS3 et le framework Bootstrap.
Pour cette évaluation, il m'est demandé de créer la page d'accueil vitrine de l'association, ainsi qu'une page regroupant les événements associés.

Je n'effectuerai pas de maquettes, mais je vais m'inspirer des designs tendance en 2021. Un de mes référentiels pour l'occasion sera: https://99designs.fr/blog/tendances/tendances-en-design-web/ .

Après avoir rangé les différents documents dans un dossier de sauvegarde, je crée un sous dossier qui contiendra le code source du future site Internet. Pour éditer les différentes sources textuelles, j'utilise Visual Studio Code. Je développe sous Linux, distribution Xubuntu 20.04 LTS. Le test du rendu se fera sur Chromium et Firefox en complément de leur console développeur respective. Pour cette évaluation, je ne me servirai pas du serveur web que j'ai installé sur mon ordinateur, mais seulement du service Github Pages, permettant, par là-même, un déploiement simple du projet.

Pour suivre, je crée différents fichiers et sous-dossiers servant de base au projet:
- La page d'accueil *index.html*
- 1 sous-dossier *styles* qui contiendra le script CSS *main.css*, support des modifications visuelles personnelles
- 1 sous dossier *images* qui contiendra l'ensemble des images du site web. Les images seront classées par leur nom respectif.

Avant de procéder à la création d'un dépot Git et de publier pour la première fois sur Github, je complète le fichier HTML de la page d'accueil *index.html* avec la structure HTML5 de base, incluant la mise en place de *Bootstrap* via son CDN. Structure qui sera reprise pour l'ensemble des futures pages créées.

```html
<!DOCTYPE html>
<html lang="fr" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="content-language" content="fr-FR">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Association Marche randonnée couëronnaise</title>
    <meta name="keywords" content="couëron,association,sport,marche,randonnée,nantes,métropole,découverte,forme">
    <meta name="description" content="Pratique de la randonnée pédestre et de la marche nordique.">
    <meta name="author" content="Christophe LEMOINE <pantaflex@hotmail.fr>">

    <meta property="og:site_name" content="Marche randonnée couëronnaise">
    <meta property="og:title" content="Association Marche randonnée couëronnaise">
    <meta property="og:description" content="Pratique de la randonnée pédestre et de la marche nordique">
    <meta property="og:image" content="https://pantaflex44.github.io/studi-evals/images/og.banner1.png">
    <meta property="og:url" content="https://pantaflex44.github.io/studi-evals/">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image:alt" content="Association Marche randonnée couëronnaise">

    <link rel="icon" type="image/x-icon" href="./images/favicon.ico">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link href="./styles/main.css" media="screen" rel="stylesheet">
</head>
<body>
    
    <!-- ici sera développé le contenu de la page -->

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
</body>
</html>
```

Comme on peut le remarquer, j'ai ajouté les meta-tags sociaux, permettant de partager le site web sur les différents médias modernes. Pour éviter les doublons, je réconcilie ces meta-tags. J'y ajoute un titre (meta title), une description (meta description), des mots clefs (meta keywords - bien que devenu presque inutile à ce jour) et diverses informations supplémentaires.

Je crée ce fichier fichier README.md que je compléterai au fûr et à mesure du développement. Je crée par la même un fichier LICENSE.txt contenant la licence d'utilisation des sources. Ici sera employée la GNU GPL v3.

Une fois ceci fait, j'ouvre mon terminal, et tape la commande:
```bash
$ git init
```
qui me permet d'initialiser un dépot Git.

Puis je viens lier mon dépôt local à mon dépôt précédement créé et configuré sur Github:
```bash
$ git remote add origin https://github.com/pantaflex44/studi-evals.git
```

Je renome la branche par défaut 'master' en 'eval1':
```bash
$ git branch --move master eval1
$ git push --set-upstream origin eval1
$ git push origin --delete master
```

A suivre, j'ajoute les fichiers nouvellement créés à mon dépot local:
```bash
$ git add .
```

Et le réalise mon premier commit en y ajoutant le premier message très original:
```bash
$ git commit -m "First commit"
```

Pour finir, je pousse ce premier commit sur le dépôt Github:
```bash
$ git push origin eval1
```

Tout au long du développement, je continuerai à pousser les changements sur le dépot Github en utilisant les 3 dernières commandes citées ci-dessus et résumées comme suit:
```bash
$ git commit -am "Rapport des modifications"
$ git push
```

La base est prète pour commencer le travail.

### Informations complémentaires

**Code source**

Pour cloner le dépot Github des différentes évaluations et suivre son évolution:
```bash
$ git clone https://github.com/pantaflex44/studi-evals.git studi_evals
$ cd studi_evals
```

**Photos et illustrations**

- Toutes les photos d'illustrations proviennent du site https://unsplash.com/.
- Les autres photos, plus personnelles, proviennent du site original.
- Les icones proviennent du site https://fontawesome.com/.
  
**Polices d'écriture**

- Police Ubuntu provenant de Google Fonts via le CDN:
```css
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
```

### Correction du formateur Studi le 5 novembre 2021

**Dossier et Correction**

[Cliquer pour visualiser](dossier-et-correction.pdf)

**Notes**

1. Interface utilisateur claire et bien pensée (4 points). 3
2. Structure sémantique html et utilisation des méta pour optimiser le référencement (4 points). 3
3. Intégration mobile first (4 points).4
4. Utilisation de git / branch / commit réguliers avec des message clairs et concis (5 points) 5
5. Déploiement de la réalisation en ligne (3 points) 3

- *<u>Total</u>: 18/20*

**Message du correcteur**

Bonjour ,

Merci pour votre réalisation.

Le résultat est très bon. Le site est en ligne, fonctionnel, et il est responsive : <u>très bien</u>.
Les liens fonctionnent.

- <u>Mise en ligne</u>: OK
- <u>GitHub</u>: bonne utilisation. commits réguliers, avec commentaires.
- <u>Site Responsive</u>: fonctionnel, le redimensionnement reste ergonomique.
- <u>Formulaire de contact</u>: il est important de prévoir une page dédiée au formulaire de contact
- <u>Description du projet</u>: c’est bien,
- <u>Référencement</u>: Très bien, vous avez pensé aux métas de référencement.

Bonne réalisation, la charte graphique est intéressante. Visuellement, le site est attrayant. Veillez
toutefois à la qualité de définition des photos, certaines pixellisent.
<br>
<br>

Démonstration: https://pantaflex44.github.io/studi-evals/