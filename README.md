# QuickParcelProject with Parcel, Sass, React and Jest

![GitHub version](https://img.shields.io/github/package-json/v/pantaflex44/QuickParcelProject)
![GitHub last commit](https://img.shields.io/github/last-commit/pantaflex44/QuickParcelProject)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/pantaflex44/QuickParcelProject)


![GitHub release](https://img.shields.io/github/downloads/pantaflex44/QuickParcelProject/total)
![GitHub license](https://img.shields.io/github/license/pantaflex44/QuickParcelProject)
![GitHub stars](https://img.shields.io/github/stars/pantaflex44/QuickParcelProject)

Create a project with Parcel, Sass, React and Jest quickly.<br />

## Get QuickParcelProject

```bash
mkdir MyProject
cd MyProject
git clone https://github.com/pantaflex44/QuickParcelProject .
```

## Short description

QuickParcelProject use Parcel to build Web app with Sass and React modules.

The Jest module is used to test your scripts.

CSS generated files, use Sass and AutoPrefixer module. JS and CSS files are minified in 'production' mode.

## Installation and Usage

Before continue, verify if Node.js and NPM module are intalled

```bash
node -v
npm -v
```

You can use Yarn if you want.

### First install all dependencies

```bash
npm install
```

### In development mode you can run Parcel with Hot reload

```bash
npm run dev
```

Default browser automaticaly opened to http://localhost:1234. Hot reload activated.

### Build package for production

```bash
npm run build
```
'dist' folder automaticaly cleaned and new versionned files built. Your React app is ready to use with an external server (because a React router is used in the 'main.jsx').

'dist' folder now contains your app to deploy.

### Test your Parcel's built files

```bash
npm run serve
```

Default browser open a new tab and load http://localhost:8080...<br />
Yeah! Your web app running with succes, you're the best [*sister*|*brother*]<br />
*Ready to deploy!*

### Run tests with Jest

```bash
npm run test
```

### Watch all changes and run tests imediately

```bash
npm run test-watch
```

### Clean the 'dist' folder

```bash
npm run clean
```

### Entry point

The main entry point is **index.html**.

**main.jsx** and the **src** folder aren't necessary, only for this sample.
**JSX** extension isn't mandatory, you could use **JS** too.

Free of use!

## Author and Copyright

Christophe LEMOINE

pantaflex at tuta point io

Licence: MIT
