# Frontend workflow

[![Netlify Status](https://api.netlify.com/api/v1/badges/aa5f20fe-ba4c-4956-b6b5-fcb2470537e1/deploy-status)](https://app.netlify.com/sites/trusting-perlman-3c2ee5/deploys)

This repository contains a (opinionated) starterkit for developing a frontend application/website. It contains code linting (with Prettier, ESLint and StyleLint), TypeScript, PostCSS with SASS (that has Bootstrap framework initialized) and generation of Favicons. The build is based on Webpack 5.

You can preview the output here: [https://trusting-perlman-3c2ee5.netlify.com](https://trusting-perlman-3c2ee5.netlify.com). There you'll find included JS components and you can do your own audit checks on this site to compare the performance with other projects.

The focus of this workflow is performance:

- By using a css-only framework, you are free to choose **whatever JS Framework you want**. [1][2]
- By using linting tools for CSS and JS, everybody follows a **consistent code style**.
- By using TypeScript, you can check your code on type errors and more.
- By generating Favicons automatically, you don't need to spend hours making all sizes of icons for all possible usecases.
- By using a PWA friendly approach, your app will also work **offline by default** and will **cache assets**.
- **Drupal 8 ready**: included (but not loaded by default) JavaScript components automatically check if they are loaded in Drupal environment and will **attach to DrupalBehaviors** accordingly.
- Code splitting ready, you can use **dynamic imports by default**.
- HTML is based on [HTML5 Starterkit](https://github.com/dainemawer/html5-starterkit). It has a lot of good defaults for ARIA, OpenGraph and Schema.org.

If you don't like a feature, you can disable it and write another one.

1. However, there are some JavaScript components included, that are written for our projects and are handy tools, but here again, you are free to not use them.
If you don't want to use them, remove them from `src/project/Site.ts`.
2. Bootstrap has it's own Javascript, this has been turned on by default. You can disable it in `src/index.ts`.

## Table of contents

- [Frontend workflow](#frontend-workflow)
  - [Table of contents](#table-of-contents)
  - [Browser support](#browser-support)
  - [OS Support](#os-support)
  - [Install](#install)
  - [Usage](#usage)
    - [Developing](#developing)
      - [TypeScript](#typescript)
      - [CSS (w/ PostCSS and SCSS)](#css-w-postcss-and-scss)
      - [Prettier/Editorconfig](#prettiereditorconfig)
      - [Images](#images)
      - [Service Worker and offline page](#service-worker-and-offline-page)
    - [Linting](#linting)
      - [Linting in VSCode](#linting-in-vscode)
    - [Components](#components)
    - [Code splitting](#code-splitting)
    - [Building](#building)
      - [Submodules](#submodules)
    - [Lighthouse audits](#lighthouse-audits)
      - [Desktop](#desktop)
      - [Mobile](#mobile)
      - [Server-side performance](#server-side-performance)
    - [Analyze](#analyze)
    - [Storybook](#storybook)
    - [Options](#options)
      - [Config Files](#config-files)
        - [.fwrc.json](#fwrcjson)
        - [.fwrc.yml](#fwrcyml)
  - [CMS Mode](#cms-mode)
    - [Removing filename hashes](#removing-filename-hashes)
    - [Setting a subfolder](#setting-a-subfolder)
    - [Favicons](#favicons)
    - [Push notifications](#push-notifications)
      - [Using it in production](#using-it-in-production)
  - [Generator](#generator)
  - [Media converter](#media-converter)
  - [Files to deploy](#files-to-deploy)
  - [TypScript usage examples](#typscript-usage-examples)
    - [Import thirdparty library](#import-thirdparty-library)
  - [Demo content](#demo-content)
  - [Requests and bugs](#requests-and-bugs)
  - [TODO](#todo)
  - [Possible libraries/workflows](#possible-librariesworkflows)
  - [Idea behind](#idea-behind)
  - [Copyright and license](#copyright-and-license)

## Browser support

The default components work on these browsers:

- IE11
- Edge (Chromium)
- Chrome (+ Mobile)
- FireFox
- Opera
- Safari (+ Mobile)

There is also [Core-JS](https://github.com/zloirock/core-js) polyfill library added for your convenience if you'll need to add more polyfills in the future.

## OS Support

Has been tested on OSX, Linux and Windows 10 (with Powershell).

## Install

Download this repository to the root of the frontend of your project.
Make sure you have the correct Node version installed. There is `.nvmrc` available for your convenience. Run in this folder:

```bash
nvm use
```

Then install all dependencies:

```bash
yarn install
```

or

```bash
npm install
```

## Usage

### Developing

Use `yarn start` to start the webpack dev server, you can now start developing, the browser will be automatically reloaded on any code/asset change. You can add the HTML in `index.html`.

You can also use `yarn start:d` to start the dev server with [dashboard](https://github.com/FormidableLabs/webpack-dashboard). This gives you a better overview of what's happening.

For examples on how to use TS within this workflow, please read `TypScript usage examples`.

You can start writing your CSS in `src/index.scss` and JS code in `src/project/Site.ts`. Alternatively, you can create your own entry points.

#### TypeScript

This starter kit is initialized with TypeScript. You can change the settings in `.tsconfig.json`. Any typings that you will need, you can add in `src/@typings`.

#### CSS (w/ PostCSS and SCSS)

This starterkit is preset with [Bootstrap framework](https://getbootstrap.com/). You can use it or you can remove it in `src/index.scss` (Do not forget to remove the Javascript in `src/index.ts`). You can also use normal `.css` files in your project, they will be bundled too.

There are some PostCSS plugins already preinstalled. You can change PostCSS setting and add/remove plugins in `postcss.config.js`.

- [postcss-utilities](https://github.com/ismamz/postcss-utilities)
- [postcss-easing-gradients](https://github.com/larsenwork/postcss-easing-gradients)
- [@csstools/postcss-sass](https://github.com/jonathantneal/postcss-sass)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [postcss-css-variables](https://github.com/MadLittleMods/postcss-css-variables)
- [cssnano](https://cssnano.co/)

**Build performance tip**: Do not use `.scss` if it's not needed, with PostCSS plugins you can do a lot of stuff. If you need mixins and variables, you should use `.scss` then.

#### Prettier/Editorconfig

There is a Prettier integration for your code style consistency. You can change its settings in `.prettierrc.json`. There is also an `.editorconfig` available to help you and your IDE to set the correct settings for code style consistency.

#### Images

Images are automatically optimized when creating a production build. No optimizations are done when using it in development mode.
Favicons/manifest files are also generated on production build only.

SVG's are optimized with [SVGO](https://github.com/rpominov/svgo-loader). You can also create a spritesheet of a select `.svg` files. If you want to include the svg in the spritesheet, just add this suffix: `-sprite`. E.g. `hamburger-icon-sprite.svg` and use it like this:

```html
<svg>
  <use xlink:href="#search-sprite"></use>
</svg>
```

**Note** The sprite file is also saved to the dist/ folder. This is useful if you want to include this file in you backend build process if needed.

#### Service Worker and offline page

The Service Worker is based on [Workbox](https://developers.google.com/web/tools/workbox/). The default implementation is pre-caching all assets used by the workflow and the pages an user has visited, will be cached for offline view. When the user is offline and tries to navigate to a page he/she hasn't visited yet, an offline page is shown. You can find the code in `offline.html`. Modify this page to match the output of the website.

You should add contact information on this page, as well as an address (if applicable) so the user can still contact you (or your client) if he/she is offline. This is a best practice.

### Linting

You also have some linting tasks available:

- `yarn tslint:lint` will type check source TypeScript files
- `yarn eslint:lint` will lint all source TypeScript files with ESLint. You can change options of the linter in `.eslintrc.json`.
- `yarn stylelint:lint` will lint all (s)css with StyleLint. You can change options of the linter in `.stylelintrc.json`.
- `yarn prettier:lint` will lint all source files with Prettier.
- `yarn lint` will run all lint tasks

There are also liting tasks available that "fix" common linting errors. These tasks are not run anywhere (the default linting tasks are run on build task for example), but they are there if you need them:

- `yarn eslint:fix` will lint and fix all source TypeScript files with ESLint. You can change options of the linter in `.eslintrc.json`.
- `yarn stylelint:fix` will lint and fix all (s)css with StyleLint. You can change options of the linter in `.stylelintrc.json`.
- `yarn prettier:fix` will lint and fix all source files with Prettier.

#### Linting in VSCode

To help you with linting, you can install these extensions for VSCode (or your favorite IDE):

- EditorConfig for VS Code
- ESLint
- Prettier
- stylelint

### Components

There are some JavaScript components available for your ease (We have included them as we reuse them a lot). There are 3 ways of using them.

1. **using AsyncModuleLoader (Default)**: All the components are automatically loaded if they are needed. By using MutationObserver, it will also check if the modules must be loaded if HTML changes.
2. **Stand-alone**: Un-comment them from entry points from `webpack.common.js`. This way they are automatically initialized and are separate from the main bundle. This way you can load them with Drupal (or other Backend CMSs) dependencies on specific pages/modules. They are also added in the built `.html` file and they just work.
3. **Included in a single bundle**: You can import them (not the `index.ts` file) manually in `Site.ts` and attach them. This way, they will be bundled in main bundle so they will require only 1 network request. You can also dynamically load them when needed.

### Code splitting

This is a default webpack behavior, please read more information here: [https://webpack.js.org/guides/code-splitting/](https://webpack.js.org/guides/code-splitting/).

This is a basic example on how you can use it:

```ts
// ./components/BigComponent.ts

export class BigComponent {
  constructor(name: string) {
    console.log(`big component initialized: ${name}`)
  }
}
```

```ts
// Site.ts

// ...
export class Site {
  constructor() {
    // ...
    this.initBigBundle()
  }

  private async initBigBundle(): Promise<void> {
    const {BigComponent} = await import(/* webpackChunkName: "bigcomponent" */ './components/BigComponent')
    const bigComponentInstance = new BigComponent('foo')
  }

  // ...
}
```

### Building

To create a production build, use `yarn build` (will lint code before) or use `yarn export` to create a build without linting the code.

#### Submodules

- **Favicons**: Will generate all icons and manifests for a PWA ready app.
- **ServiceWorker**: Will generate a service worker to cache resources of the website, thus allowing offline usage. (Depends on how you structure your app).
- **Async JS**: Will add `async` attribute on all scripts allowing them not to block the rendering.

### Lighthouse audits

With default configuration, the lighthouse audit gives us this score. However, to get the full pass on the audit you must follow it's guidelines when modifying the default settings and adding new CSS and/or JS. Some things you just can't automate fully. Look at the comments below how to fix those issues.

#### Desktop

- **Performance**: 100. Keep in mind: the more JS/CSS you write, the worse it can get. When adding images, you can use lazy loading for a better score.
- **Progressive Web App**: 100.
- **Accessibility**: 100.
- **Best Practices**: 100.
- **SEO**: 100. Please consider reading SEO optimizations articles. Do not forget to add the correct attributes in HTML.

#### Mobile

Same metrics for mobile.

#### Server-side performance

Keep in mind that servers (and their configuration) are a big part of performance. The demo site is running on [Netlify servers](https://netlify.com) and their configuration is optimized for static pages and front-end. This way we can get such high score. If you are hosting your website yourself you'll need to add cache-, gzip-, expires, ... headers yourself.

### Analyze

This workflow has [Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) included if you want to see how to optimize your bundle. You can run it with `yarn analyze` and it will make a production build (can take a while) and open up a browser window with the analysis of the bundle.

When running this command, a `stats.json` will be generated. You can also upload it [here](http://webpack.github.io/analyse/) and it will show you more info on how to optimize your build.

### Storybook

There is a basic installation of storybook in this repository. You can run it with `yarn storybook`.
There you can find most of the standard components that are included in the library. You can also add your own components, can be used as a styleguide.

### Options

Before creating a build, you should update the following files/settings:

1. Update config. See table below and docs on [config files](#config-files).
2. Supported browsers can be changed under `"browserslist"` key in `package.json`.
3. Add an app icon in `src/favicon.png`. The build will create all possible icons for your app (iOS, Android, Browsers, ...). You should use a high enough resolution, minimum of 256x256px (preferably 1024x1024px).
4. Add an app share image in `src/og-image.png`. This will be the image preview when you share this website/project on social media.
5. Modify `<head>` in `index.html` with the your preferences.
6. Modify `offline.html` with the branding and content of the website.

| Name                                 | Type            | Default             | Description                                                                                                                                                                                                                               |
| ------------------------------------ | --------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| theme                                | `string`        | "#007bb3"           | Theme attribute to be inserted in manifest.json and HTML tags. (use with `#`)                                                                                                                                                             |
| background                           | `string`        | "#ffffff"           | Background attribute to be inserted in manifest.json. (use with `#`)                                                                                                                                                                      |
| language                             | `string`        | "en-US"             | Will be injected in HTML and JS                                                                                                                                                                                                           |
| googleSiteVerification (Optional)    | `string`/`null` | null                | Will be injected in HTML                                                                                                                                                                                                                  |
| manifest.name                        | `string`        | "Frontend Workflow" | Name attribute to be inserted in manifest.json.                                                                                                                                                                                           |
| manifest.shortName                   | `string`        | "Frontend"          | Short name attribute to be inserted in manifest.json. (12 Chars max for best results)                                                                                                                                                     |
| manifest.description                 | `string`        | ""                  | Description attribute to be inserted in manifest.json.                                                                                                                                                                                    |
| manifest.author                      | `string`        | ""                  | Author attribute to be inserted in manifest.json.                                                                                                                                                                                         |
| manifest.authorUrl                   | `string`        | ""                  | Author URL attribute to be inserted in manifest.json.                                                                                                                                                                                     |
| html.title                           | `string`        | ""                  | Title of the page. Will be injected in HTML for various tags.                                                                                                                                                                             |
| html.description                     | `string`        | ""                  | Description of the page. Will be injected in HTML for various tags.                                                                                                                                                                       |
| html.url                             | `string`        | ""                  | The live url where the project will be located. Will be injected in HTML for various tags.                                                                                                                                                |
| html.siteName                        | `string`        | ""                  | Name of the project/site. Will be injected in HTML for various tags.                                                                                                                                                                      |
| html.siteSummary                     | `string`        | ""                  | Summary of the project/site. Will be injected in HTML for various tags.                                                                                                                                                                   |
| html.author                          | `string`        | ""                  | Name of the company/person of the project/site. Will be injected in HTML for various tags.                                                                                                                                                |
| html.twitterSite (Optional)          | `string`/`null` | null                | Twitter tag for the project/site. Will be injected in HTML for various tags.                                                                                                                                                              |
| html.twitterAuthor (Optional)        | `string`/`null` | null                | Twitter tag for the company/person. Will be injected in HTML for various tags.                                                                                                                                                            |
| devServerHTTPS                       | `boolean`       | false               | Run development server in HTTPS mode                                                                                                                                                                                                      |
| addFilenameHashes                    | `boolean`       | true                | Add contenthash to bundle files (useful for cache busting).                                                                                                                                                                               |
| forceNoHashesOnDev                   | `boolean`       | false               | Force to not add contenthash to bundle files when developing (`yarn start` or `yarn watch`). (Useful when HTML is not managed by Webpack)                                                                                                 |
| outputPath                           | `string`        | dist                | Folder name (from the root) where to output files.                                                                                                                                                                                        |
| subFolder                            | `string`        | "/"                 | Folder name where the browser will look for files.                                                                                                                                                                                        |
| serviceWorkerOnLocalHost             | `boolean`       | false               | Activate service-worker on localhost (allows you to test it, don't enable it when developing your application)                                                                                                                            |
| createTagsFile                       | `boolean`       | false               | If set to true, an additional `tags.html` file will be created with all favicon and manifest links (Useful to include them later if you are building your html files on the server). They are however always injected into `.html` files. |
| useEsBuild                           | `boolean`       | false               | Use [esbuild](https://github.com/evanw/esbuild) as a loader to build JS/TS much faster.                                                                                                                                                   |
| modules.favicons                     | `boolean`       | true                | Generate favicons on build. Only used in production build.                                                                                                                                                                                |
| modules.serviceWorker                | `boolean`       | true                | Generate a Service Worker using WorkBox. Only used in production build.                                                                                                                                                                   |
| modules.asyncJS                      | `boolean`       | true                | Add `async` attribute to scripts. Only used in production build.                                                                                                                                                                          |
| bootstrap.importBundle               | `boolean`       | true                | If set to `true`, the whole JS bundle will be included for ease. If you want to have more control of what components are loaded, you can set this to `false` and import select components from Bootstrap directly.                        |
| components.expose                    | `boolean`       | false               | If set to `true`, all default components will be exposed to window.FW object.                                                                                                                                                             |
| googleFonts                          | `array`         | []                  | See [FontObject[]](https://github.com/beyonk-adventures/google-fonts-webpack-plugin#fontobject) from the plugin. When set the fonts will be served locally, optimizing loading times                                                      |
| pushNotifications.enabled            | `boolean`       | false               | Enable push notifications logic, more info here: [Push notifications](#push-notifications).                                                                                                                                               |
| pushNotifications.vapidKeyEndpoint   | `string`        | ''                  | Endpoint to get keys for push notifications                                                                                                                                                                                               |
| pushNotifications.registerEndpoint   | `string`        | ''                  | Endpoint to register user for push notifications                                                                                                                                                                                          |
| pushNotifications.unregisterEndpoint | `string`        | ''                  | Endpoint to unregister user for push notifications                                                                                                                                                                                        |

**Note** All options are "optional" in the sense that the build will still work if you don't pass them, but you should review and define all "Required" options for the launch of your app.

#### Config Files

The configuration of the build can be defined by a `fw` key in `package.json` or by using config files (like `.fwrc` or `.fwrc.json`). The config reader is based on [Cosmiconfig](https://github.com/davidtheclark/cosmiconfig), there you can find all possible methods to define the config.

Here are some examples (you can define only the keys that you want to change):

##### .fwrc.json

```json
{
  "theme": "#007bb3",
  "manifest": {
    "name": "Frontend workflow"
  },
  "html": {
    "url": "https://trusting-perlman-3c2ee5.netlify.com"
  }
}
```

##### .fwrc.yml

```yaml
theme: '#007bb3'
manifest:
  name: 'Frontend workflow'
html:
  url: 'https://trusting-perlman-3c2ee5.netlify.com'
```

## CMS Mode

If you are using a backend CMS, the HTML can't be managed by Webpack (Webpack injects a lot of stuff into the HTML template). Thus when developing such an application you should use `yarn watch`, this way, all the files are created in the `dist` folder. You can then reference these files in your HTML.

You can still use `yarn start` for fast prototyping. As `yarn watch` if for DEV environment, you should always make a build before pushing the project on production. This can be done by your CI.

There are some settings you should change if you are building the HTML yourself. You can also look at `.fwrc-cms-example.json` for sample configuration when using Drupal 8.

### Removing filename hashes

By setting `addFilenameHashes` to `false`, you can remove the cache busting hash from the files. That way you can reference the files in your HTML.

**Note:** Keep in mind that `.css` files are only created on production build, so you won't have `.css` files when watching. Do not forget to include them in the HTML when you are building a bundle!

### Setting a subfolder

Most of the time, when using a CMS, the frontend will not be at the root of your project, but in a subfolder. You can change the `subFolder` config key to something like this: `/themes/custom/fw2020/dist/` (this workflow should be inside `/themes/custom/fw2020/`). All the links should then point to correct path.

### Favicons

As Favicon and manifest tags are injected into `index.html` file on build, you will need to set `createTagsFile` to `true` to generate a `dist/tags.html` file that you can then inject into the head of your project.

### Push notifications

There is some code to help you create and use push notifications. The code by default is NOT production ready, but it's extensible and can be changed easily. With the default configuration, you can test it locally:

1. Set `pushNotifications.enabled` to `true`, this will automatically register user for push notifications (after the user gives his/her conscent by clicking on a button).
2. Set `serviceWorkerOnLocalHost` to `true` so the service worker will load the logic.
3. Start the devserver with `yarn start` and scoll to the "Web Push Notifications" section. There, click on the button "Request notifications". When you click "Allow" in the browser, you can now send a push notification. You'll see it in a few seconds.

#### Using it in production

When deploying the project, you'll need to use a server to send push notifications from. When developing, we are using Webpack Devserver to generate keys and send notifications, so you can get the code from it.

Do not forget to update `pushNotifications.vapidKeyEndpoint` and `pushNotifications.registerEndpoint` to correct urls to the server. From now on you can receive basic push notifications, however, you would like to extend the current functionality. You can find it in these files:

- `src/lib/components/push-notifications/PushNotificationsManager.ts`
- `src/sw.js`

## Generator

We have included a code generator to generate some commonly used pieces of code.

You can use it with `yarn generate`. These are all options:

- `yarn generate js component [name] (--withCss)`: Will create a JS component.
- `yarn generate css folder-structure`: Will create a basic folder structure
- `yarn generate css section [name]`
- `yarn generate css block [name]`
- `yarn generate css component [name]`

## Media converter

There are also some helpers for the media. The first one is to convert video's to a smaller size (mp4 and/or webm).
(You'll need to install `ffmpeg` to use these commands). The output of the command will be at the root of the project.

- `yarn media convert video-mp4 [path_to_video] (--stripAudio) (--scaleDown)`
- `yarn media convert video-webm [path_to_video] (--stripAudio) (--scaleDown)`

## Files to deploy

Webpack creates a bundle of your app in the folder `dist`. Therefore you can only deploy the build folder to production.
All other files you should NOT deploy to production as this can pose a security threat.

## TypScript usage examples

Here are some examples on how to use TS with this workflow.

### Import thirdparty library

If a library in question is written in TS or has TS support, you can just import it normally.

```ts
import EE from 'onfire.js'

export default class Canvas extends EE {
  constructor() {
    super()
  }
}
```

If a library has no support for TS, you'll need to search for types in npm repository for this library.

```bash
yarn add @types/jszip
```

```ts
import JSZip from 'jszip'
const zip = new JSZip()
```

If no types do not exist, you'll need to create one yourself and add it to folder `src/typings/`. Find information on how to do it here: [https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)

## Demo content

You can see the demo here: [https://trusting-perlman-3c2ee5.netlify.com](https://trusting-perlman-3c2ee5.netlify.com). To remove all demo content, follow these steps:

- Remove `demo` entry point from `webpack.common.js`
- Remove `src/demo`
- Remove demo html from `index.ejs` and `offline.ejs`
- *NOTE*: The stories require demo content. The build will fail if the images from demo are removed because they are needed for some stories. You can replace those images with your own or some placeholder.

You can now start with our own project.

## Requests and bugs

If you encounter bugs or have some requests, please create a ticket at [Github](https://github.com/ioulian/frontend-workflow/issues).

## TODO

These are our own TODO's that might, or might not be included in this workflow, based on priority, ease of use/configuration and performance gain/penalty. If you want to implement them or help us out, you can always let us know!

- (LOW PRIO) Add fallbacks for images/fonts if offline
- (LOW PRIO) [https://webpack.js.org/configuration/configuration-languages/](https://webpack.js.org/configuration/configuration-languages/)
- (LOW PRIO) Change lazy loading to this way: [https://addyosmani.com/blog/lazy-loading/](https://addyosmani.com/blog/lazy-loading/)
- (LOW PRIO) Change fixed header implementation to [https://pqina.nl/blog/applying-styles-based-on-the-user-scroll-position-with-smart-css/](https://pqina.nl/blog/applying-styles-based-on-the-user-scroll-position-with-smart-css/) maybe?

## Possible libraries/workflows

To keep the performance of the app up and the workload for developers low, this is a list of useful libraries/workflows:

- [js-cloudimage-responsive](https://github.com/scaleflex/js-cloudimage-responsive)

## Idea behind

This frontend framework started as a simple grunt task (a few years back) that minified CSS and JS. From there it grew into more advanced gulp tasks, that transpiled ES6, built SCSS, generated favicons and optimized images. Now this is rewritten for Webpack.

We use this workflow in our websites and projects and will update it with any new stuff (JS components/performance optimizations/...) that we think will make this workflow better and faster. This is an ongoing project, but maybe in the future we will create a new one when new technologies arrive.

There is no automatic upgrade path available as this is a boilerplate, however it should be possible for you to upgrade to a new version if you only keep `src/` from your project and update everything else. (Except if you change some settings in webpack config or any .json files, you'll need to update them too later).

## Copyright and license

Code copyright 2021 Yulian Alexeyev. Code released under [the MIT license](LICENSE).
