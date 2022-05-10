# Scientific Research Achievement Review System

**English** | [中文](./README-zh_CN)

## Introduction

Based on [vue](https://github.com/vuejs/vue) and [element-plus](https://github.com/element-plus/element-plus) implementation🎉：

The technology used in this architecture is: a new generation of front-end framework of vue3+vite2+element-plus，It's fast!

Use eslint format to verify code to improve code standardization and development efficiency

## Changelog

--

---

## Online experience

gitee address： https://gitee.com/torUntitled/paper_review_system.git

[comment]: <> ([Access address]&#40;http://paper.lunatic.ren/login&#41;)

## Related items

![image-20220107085038579](https://gitee.com/torUntitled/images/raw/master/img/notes/image-20220107085038579.png)

--


## Build step

```bash
# Clone project
git clone https://gitee.com/torUntitled/paper_review_system.git

# Enter the project directory
cd  paper_review_system

# Install dependencies
npm install

# Start the serve
npm run serve
```

After the startup is completed, the browser will be automatically opened to access [http://localhost:9876](http://localhost:9876/). If you see the following page, it means the operation is successful.🎈

![login](https://gitee.com/torUntitled/images/raw/master/img/notes/login.png)

## Release

```bash
# Build test environment
npm run build-serve

# Build production environment
npm run build
```

## Features

```
- log in Register

- ASD
   - Page permissions
   - Command permissions
   - Rights Profile

- Multi-environment publishing
   - serve
   -build

- Global functions
   #- Internationalized Multilingual
   - Multiple dynamic skinning
   - Quick Navigation (Tabs)
   - Svg Sprite Icon (Cancel)
   - Screenfull full screen
   - Adaptive shrink sidebar
   #- Dynamic sidebar (supports multi-level routing nesting)
   #- Dynamic breadcrumbs

- editor
   - Rich text
   #- Markdown

- Preview
   - pdf
   -word
   - Compressed packages such as zip
  
- mail
   - registered account email
   - Review emails
   #- email alert
 
- upload
   - File Upload
 
- download
   - file download

- error page
   - 404

- Components
   - Avatar upload
   - Dialog
   - ValidCode
   -Message
```

>Note: #- -- not implemented yet (waiting for subsequent development)

## Dependency-cruiser 

![dependencygraph](https://gitee.com/torUntitled/images/raw/master/img/notes/dependencygraph.svg)

> Project dependency graph

## Directory Structure

```bash
├── public
│   ├── static
│   │   └── config.js
│   ├── favicon.ico
│   └── index.html         
├── src                    # source code
│   ├── assets             # Static resources such as themes and fonts
│   ├── components         # Global Common Components
│   ├── layout             # global layout
│   ├── router             # router
│   ├── store              # Global store management
│   ├── utils              # global public method
│   ├── views              # views all
│   ├── App.vue            # entry page
│   ├── main.js            # Entry file Load component initialization, etc.
│   └── setting.js
├── babel.config.js
├── package-lock.json
├── package.json    
├── README-zh_CN.md
├── vue.config.js
└── webpack.config.js
```



## Git   Contribution submission specification

  - `feat` Add new features
  - `fix`  Fix problems/bugs
  - `style` Code style related without affecting the running result
  - `perf` Optimization/Performance Improvement
  - `refactor` refactor
  - `revert` revert
  - `test` test
  - `docs` Documentation/Notes
  - `chore` Dependency updates/scaffolding configuration modifications, etc.
  - `workflow` Workflow Improvements
  - `ci` Continuous Integration
  - `types` Type definition file changes
  - `wip` In development



## Browser support

Note: vue3 no longer supports IE browser
Modern browsers and Internet Explorer 11+.

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| IE11, Edge                                                   | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              |

## Maintainer

[YOU](https://gitee.com/torUntitled)

