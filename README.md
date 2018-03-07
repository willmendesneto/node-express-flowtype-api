# Node Express Flowtype API

# Features
- ES7+
- Babel
- Flow
- ESLint
- Express

# Requirements
- NodeJS v8.9.4 or newer
- npm v5.6.0 or newer

# Quick start of new project

- clone boilerplate by running
  `git clone https://github.com/willmendesneto/node-express-flowtype-api.git`
- go to project folder `cd node-express-flowtype-api`
- run `npm install`
- run `npm run dev` for development
- build production version by running `npm run build`

# Existing project
- clone repository
- run `npm`
- run `npm run dev` for development

# Why `npm start` is broken?

Because this package can run in some servers that are running `npm start` build production version by running `npm run build`


# Folders structure
```
.
├─── flow-typed       : flow type definitions
├─── dist            : built app (do not push to source control)
├─── src             : source files
└─── __tests__       : unit tests
```

# Tasks
```
npm run start         : start production built app
npm run clean         : clean dist folder
npm run lint          : run JavaScript linter
npm run dev           : start development
npm run build         : build for production
npm test              : run unit tests
npm run flow           : run flow
npm run check:all     : run 'lint', 'flow' and 'test' tasks
```
