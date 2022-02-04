// tests via Jest:

// pour installer Jest:
// yarn add -D jest @types/jest @testing-library/dom @testing-library/jest-dom

// pour tester les modules React avec Jest:
// yarn add -D @testing-library/react @testing-library/react-hooks react-test-renderer

// pour intégrer les fichiers JSX à Jest:
// yarn add -D babel-jest @babel/preset-env @babel/preset-react

// babel.config.js
// module.exports = {
//     presets: [
//         '@babel/preset-env',
//         '@babel/preset-react',
//     ]
// }

// jest.config.js
// module.exports = {
//     clearMocks: true,
//     coverageDirectory: "coverage",
//     testEnvironment: "jsdom",
//     transform: {
//         "^.+\\.jsx?$": "babel-jest",
//     },
//     setupFilesAfterEnv: ["./src/setupTest.js"],
// };

// pour lancer les tests:
// npx jest

// pour lancer les tests en surveillant les modifs
// npx jest --watchAll

import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import React from "react";

import App from "../App";

test("Application initiale", () => {
    render(<App />);

    const title = screen.getByText(
        "QuickParcelProject with Parcel, Sass, React and Jest"
    );

    expect(title).toBeInTheDocument();
});
