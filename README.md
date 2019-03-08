# Frontend workflow

This repository contains a starterkit for developing a frontend application/website. It contains code linting (with Prettier, TSLint and StyleLint), TypeScript, PostCSS with SASS (that has Bulma.io framework initialized) and generation of Favicons. The build is based on Webpack 4.

The focus of this workflow is performance:

- By using a css-only framework, you are free to choose **whatever JS Framework you want**.
- By inlining critical CSS/JS and async loading the rest, you'll get a fast **First Meaningful Paint**.
- By using linting tools for CSS and JS, everybody follows a **consistent code style**.
- By using TypeScript, you can check your code on type errors and more.
- By generating Favicons automatically, you don't need to spend hours making all sizes of icons for all possible usecases.
- By using a PWA friendly approach, your app will also work **offline by default** and will **cache assets**.

If you don't like a feature, you can disable it and write another one.
Currently only TypeScript is supported. Will add vanilla JS soon.

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

#### TypeScript

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

#### Submodules

- **Favicons**: Will generate all icons and manifests for a PWA ready app.
- **CriticalCSS**: Will inline critical CSS, based on 3 viewports (Mobile, Tablet Horizontal, Desktop). You can edit the viewports.
- **SW Precache**: Will generate a service worker to cache resources of the website, thus allowing offline usage. (Depends on how you structure your app).
- **Async JS**: Will add `async` attribute on all scripts allowing them not to block the rendering.

### Lighthouse audits

With default configuration, the lighthouse audit gives us this score. However, to get the full pass on the audit you must follow it's guidelines when modifying the default settings and adding new CSS and/or JS. Some things you just can't automate fully. Look at the comments below how to fix those issues.

#### Desktop

- **Performance**: 100. Keep in mind: the more JS/CSS you write, the worse it can get. When adding images, you can use lazy loading for a better score.
- **Progressive Web App**: 92. You can get 100 by redirecting HTTP to HTTPS.
- **Accessibility**: 90. By using default Bulma css, the color contrast is not good enough, you can change the colors based on the project.
- **Best Practices**: 93. Use HTTP/2 on your server for a better score.
- **SEO**: 100. Please consider reading SEO optimizations articles. Do not forget to add the correct attributes in HTML.

#### Mobile

Same metrics for mobile with default configuration.

### Options

Before creating a build, you should update the following files/settings:

- 1: Everything under `"config"` key in `package.json`. See table below.
- 2: Supported browsers can be changes under `"browserslist"` key in `package.json`.
- 3: Add an app icon in `src/favicon.png`. The build will create all possible icons for your app (iOS, Android, Browsers, ...). You should use a high enough resolution, minimum of 256x256px.

| Name                | Type      | Default                               | Description                                                             |
| ------------------- | --------- | ------------------------------------- | ----------------------------------------------------------------------- |
| publicPath          | `string`  | /                                     | The final url where the app will be hosted. Only needed for production. |
| cacheId             | `string`  | frontend-workflow                     | Cache ID for Service Worker.                                            |
| name                | `string`  | Frontend Workflow                     | Name attribute to be inserted in manifest.json.                         |
| shortName           | `string`  | Frontend                              | Short name attribute to be inserted in manifest.json.                   |
| description         | `string`  | /                                     | Description attribute to be inserted in manifest.json.                  |
| author              | `string`  | /                                     | Author attribute to be inserted in manifest.json.                       |
| authorUrl           | `string`  | /                                     | Author URL attribute to be inserted in manifest.json.                   |
| theme               | `string`  | #00d1b2 (Default Bulma primary color) | Theme attribute to be inserted in manifest.json. (use with `#`)         |
| background          | `string`  | #ffffff                               | Background attribute to be inserted in manifest.json. (use with `#`)    |
| modules.favicons    | `boolean` | true                                  | Generate favicons on build. Only used in production build.              |
| modules.criticalCSS | `boolean` | true                                  | Inline Critical CSS. Only used in production build.                     |
| modules.swPrecache  | `boolean` | true                                  | Generate a Service Worker. Only used in production build.               |
| modules.asyncJS     | `boolean` | true                                  | Add `async` attribute to scripts. Only used in production build.        |

## Files to deploy

Webpack creates a bundle of your app in the folder `dist`. Therefore you can only deploy the build folder to production.
All other files you should NOT deploy to production as this can pose a security threat.

## Requests and bugs

If you encounter bugs or have some requests, please create a ticket at [Github](https://github.com/ioulian/frontend-workflow/issues)

## TODO

- add config to sw-precache.json
- cleanup settings and add more

## Copyright and license

Code copyright 2019 Yulian Alexeyev. Code released under [the MIT license](LICENSE).
