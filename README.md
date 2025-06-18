# Backstage Management System

## 简介

后台管理系统，基于Vue3 + Element-Plus + Axios + Pinia

## 环境配置

-[npm](https://www.npmjs.com/) 11.4.2

-[Node](https://nodejs.org/zh-cn) v22.14.0

## 技术栈

-前端框架：[Vue3](https://vuejs.org/)

-UI组件：[Element-Plus](https://element-plus.org/zh-CN/)

-状态管理：[Pinia](https://pinia.vuejs.org/zh/introduction.html)

-请求封装：[Axios](https://www.axios-http.cn/)

## 依赖安装

```sh
npm install
```

### 开发环境编译（支持热重载）

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
