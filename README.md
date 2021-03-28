[![Netlify Status](https://api.netlify.com/api/v1/badges/d63df0b1-8aaa-4ee6-98ed-127f88b488c3/deploy-status)](https://app.netlify.com/sites/loving-lumiere-cd3724/deploys)

## Redux Toolkit Course

```sh
$ git clone https://github.com/webmasterdevlin/redux-toolkit-course.git
$ cd redux-toolkit-course
$ npm install
$ npm run start:fullstack
```

The React app, and the fake web service will run concurrently.

![screenshot](./screenshot.png)


### React Testing Library's best practices in writing tests

https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

- always use eslint-plugin-testing-library and eslint-plugin-jest-dom
- always use screen
- use screen.getByRole instead of screen.getByTestId
- use screen.queryByRole only when expecting not.toBeInTheDocument
- use await screen.find* instead of await waitFor/wait
- if necessary, use await waitFor instead of await wait
- use userEvent instead of fireEvent
- don't use userEvent inside the callback of waitFor


### Cypress' best practices in writing tests

https://docs.cypress.io/guides/references/best-practices.html

### Application's styles

- The application is using test ID instead of role when querying dom elements
- Test IDs are simple and isolated
