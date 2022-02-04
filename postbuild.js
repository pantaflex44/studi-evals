const fs = require("fs");
const path = require("path");
const replace = require("replace-in-file");
const escapeRegExp = require("lodash.escaperegexp");

const baseDir = "./";
const parentDir = "../";
const distDir = "dist";

const cssDir = "css";
if (!fs.existsSync(path.join(__dirname, baseDir, distDir, cssDir))) {
    fs.mkdirSync(path.join(__dirname, baseDir, distDir, cssDir));
}

const jsDir = "js";
if (!fs.existsSync(path.join(__dirname, baseDir, distDir, jsDir))) {
    fs.mkdirSync(path.join(__dirname, baseDir, distDir, jsDir));
}

const assetsDir = "assets";
if (!fs.existsSync(path.join(__dirname, baseDir, distDir, assetsDir))) {
    fs.mkdirSync(path.join(__dirname, baseDir, distDir, assetsDir));
}

console.log("Structurize dist folder...");
console.log("");

const replacePath = (file, obj, dir) => {
    obj.forEach((name) => {
        let options = {
            files: path.join(distDir, file),
            from: new RegExp(escapeRegExp(name), "g"),
            to: dir + "/" + name,
        };
        try {
            let changedFiles = replace.sync(options);
            console.log(
                "Modified files:",
                changedFiles.map((o) => o.file).join(", ")
            );
        } catch (error) {
            console.error("Error occurred:", error);
        }
    });
};

const moveFile = (obj, dir) => {
    obj.forEach((name) => {
        fs.rename(
            path.join(__dirname, distDir, name),
            path.join(__dirname, distDir, dir, name),
            function (err) {
                if (err) throw err;
                console.log(`Successfully moved ${name}`);
            }
        );
    });
};

fs.readdir(`./${distDir}`, (err, files) => {
    let html = [];
    let js = [];
    let css = [];
    let maps = [];
    let assets = [];

    console.log("Files found:");

    files.forEach((file) => {
        if (file.match(/.+\.(html)$/)) {
            html.push(file);
        } else if (file.match(/.+\.(js)$/)) {
            js.push(file);
        } else if (file.match(/.+\.(map)$/)) {
            maps.push(file);
        } else if (file.match(/.+\.(css)$/)) {
            css.push(file);
        } else if (file.match(/.+\..+$/)) {
            assets.push(file);
        }
    });
    const allAssets = assets.concat(maps);

    console.log("html", html);
    console.log("css", css);
    console.log("js", js);
    console.log("maps", maps);
    console.log("assets", assets);
    console.log("");

    html.forEach((file) => {
        replacePath(file, css, baseDir + cssDir);
        replacePath(file, js, baseDir + jsDir);
        replacePath(file, allAssets, baseDir + assetsDir);
    });

    js.forEach((file) => {
        replacePath(file, maps, parentDir + assetsDir);
        replacePath(file, assets, parentDir + assetsDir);
    });

    css.forEach((file) => {
        replacePath(file, assets, parentDir + assetsDir);
    });

    moveFile(allAssets, assetsDir);
    moveFile(js, jsDir);
    moveFile(css, cssDir);
});
