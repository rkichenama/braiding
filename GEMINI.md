# Project: Braiding Visualizer

## Project Overview

The "Braiding" project is a web application built with React, TypeScript, and Webpack. It appears to be a tool for visualizing or manipulating braiding patterns, with a focus on graphical representation and potentially interactive elements. The project utilizes modern web development practices, including a robust build process managed by Webpack and type safety provided by TypeScript.

## Technologies

*   **Frontend Framework:** React
*   **Language:** TypeScript
*   **Bundler:** Webpack
*   **Styling:** Sass, CSS Loader, MiniCssExtractPlugin (also exploring styled-components based on TODO.md)
*   **State Management:** Redux (inferred from `src/redux` directory and `TODO.md`)
*   **Development Server:** Webpack Dev Server

## Building and Running

The project uses Webpack for its build process. Key commands can be found in the `package.json` scripts:

*   **Development Server:**
    ```bash
    npm run start:dev
    ```
    This command starts a development server, likely with hot module replacement, accessible at `http://localhost:4242`.

*   **Development Build:**
    ```bash
    npm run build:dev
    ```
    Builds the project for development.

*   **Production Build:**
    ```bash
    npm run build:prod
    ```
    Builds the project for production, outputting assets to the `docs` directory.

*   **Type Checking:**
    ```bash
    npm test
    ```
    Runs TypeScript compilation (`tsc --noEmit`) for type checking.

## Development Conventions

*   **TypeScript:** Used for static typing, enhancing code maintainability and reducing errors.
*   **Sass:** Employed for styling, with `sass-loader` and `css-loader` configured in Webpack.
*   **Component Structure:** Components are organized within the `src/components` directory.
*   **Redux:** Indicated for state management, with the intention of using Redux with hooks according to `TODO.md`.
*   **Versioning:** `standard-version` is used for managing releases and generating changelogs.

## Project Structure

*   **`src/`**: Contains the main application source code, including React components, Redux logic, styles, and entry point (`index.tsx`).
*   **`dist/`**: Output directory for development builds.
*   **`docs/`**: Output directory for production builds.
*   **`webpack.config.js`**: Configuration file for Webpack.
*   **`tsconfig.json`**: TypeScript compiler options.
*   **`package.json`**: Project metadata, dependencies, and scripts.
*   **`TODO.md`**: Contains notes on planned features and technical considerations.
