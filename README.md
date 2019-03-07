# Frontend workflow

This repository contains a starterkit for developing a frontend application/website. It contains code linting (with Prettier, TSLint and StyleLint), Typescript, PostCSS with SASS (that has Bulma.io framework initialized) and generation of Favicons. The build is based on Webpack 4.

## Install

Download this repository to the root of the frontend of your project.
Make sure you have the correct Node version installed. There is `.nvmrc` available for your convenience. Run in this folder:

```bash
nvm use
```

Then install all dependencies:

### NPM

```bash
npm install
```

or

### Yarn

```bash
yarn
```

## Usage

### Developing

Use `yarn start` to start the webpack dev server, you can now start developing, the browser will be automatically reloaded on any code/asset change. You can add the HTML in `index.html`.

#### Typescript

This starter kit is initialized with TypeScript. You can change the settings in `.tsconfig.json`. Any typings that you will need, you can add in `src/typings`.

There is no normal `.js` files loader, this will be added in the future updates.

#### CSS (w/ PostCSS and SCSS)

This starterkit is preset with [Bulma css framework](https://bulma.io). You can use it or you can remove it in index.scss. You can also use normal `.css` files in your project, they will be bundled too.

There are some PostCSS plugins already preinstalled. You can change PostCSS setting and add/remove plugins in `postcss.config.js`.

#### Prettier/Editorconfig

There is a Prettier integration for your code style consitency. You can change its settings in `.prettierrc.json`. There is also an `.editorconfig` available to help you and your IDE to set the correct settings for code style consistency.

#### Images

Images are automatically optimized when creating a production build. No optimizations are done when using it in development mode.
Favicons/manifest files are also generated on production build only.

### Linting

The code will be automatically linted, but you also have some linting tasks available:

- `yarn lint:js` will lint all TypeScript files with TSLint. You can change options of the linter in `.tslint.json`.
- `yarn lint:css` will lint all (s)css with StyleLint. You can change options of the linter in `.stylelintrc.json`.
- `yarn lint` will run both lint tasks

### Building

To create a production build, use `yarn build` (will lint code before) or use `yarn export` to create a build without linting the code.

### Options

Before creating a build, you should update the following files/settings:

- 1: Everything under `"config"` key in `package.json`.
- 2: Supported browsers can be changes under `"browserslist"` key in `package.json`.
- 3: Add an app icon in `src/favicon.png`. The build will create all possible icons for your app (iOS, Android, Browsers, ...). You should use a high enough resolution, minimum of 256x256px.

## Files to deploy

Webpack creates a bundle of your app in the forlder `dist`. Therefore you can only deploy the build folder to production.
All other files you should NOT deploy to production as this can pose a security threat.

## Requests and bugs

If you encounter bugs or have some requests, please create a ticket at [Github](https://github.com/ioulian/frontend-workflow/issues)

## TODO

- add config to sw-precache.json

## Copyright and license

Code copyright 2019 Yulian Alexeyev. Code released under [the MIT license](LICENSE).
