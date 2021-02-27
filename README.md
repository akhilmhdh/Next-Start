<p align="center">
    <h2 align="center">Next-Start</h3>
</p>

Next-Start is a starting kit for Next.js with linting, prettier, husky and basic hooks.
It doesn't have UI libraries added to it. But Soon :smile: a plug and play version using github.
Maintained by [akhilmhdh](https://github.com/akhilmhdh)

## Getting Started

```bash
 git clone -b main --single-branch <url> --depth 1
 cd
 yarn install
 yarn dev
```

## Libraries

1. [NextJS](https://nextjs.org): Main Framework
2. [Axios](https://github.com/axios/axios): HTTP API Client Library
3. [SWR](https://swr.vercel.app): Data Fetching Library
4. [React Hook Form](https://react-hook-form.com) & [@hookform/resolvers](https://github.com/react-hook-form/resolvers): Form handling
5. [Yup](https://github.com/jquense/yup): Form validation
6. [Eslint](https://eslint.org) & [Prettier](https://prettier.io/): Linting
7. [Husky](https://github.com/typicode/husky) & [Lint-Staged](https://github.com/okonet/lint-staged): Formating
8. [Camelcase-keys](https://github.com/sindresorhus/camelcase-keys) & [Snakecase-keys](https://github.com/bendrucker/snakecase-keys): Interceptors converters for other stack backend

## File Structure

```bash
./src
|-- api - API sets for all backend operations
|-- components - Reusable UI components like Textfield, Modal
|-- containers - Shared components
|-- config - Configurations eg: request config
|-- const - All constants eg: localstorage keys
|-- context - Global Context
|   |-- AuthContext - Authentication provider for access control
|   |-- ThemeContext - Theme provider acting as centralized theme store
|-- hooks - Global Hooks
|   |-- useFetch - SWR wrapper hook for better fetching
|   |-- usePopUp - PopUp, Modal controller hook
|   |-- useTimeoutState - A timeout state hook
|-- layouts - General layouts of the app
|-- pages - NEXTJS pages folder (See the doc)
|-- styles - Global Styles
|-- types - Global Types
|-- utils - Utility function
|-- views - Page views corresponding to pages
|   |-- HompageView - Page view for homepage
|   |   |-- Components - Components specific to this page
|   |   |-- Homepage.tsx - Main file
|   |   |-- Homepage.helper.ts - Helper functions for the Homepage
|   |   |-- Homepage.template.ts - Template function for rendering list of items etc
|   |   |-- Homepage.test.tsx - Test File
|   |   |-- index.tsx - Entry point
```

## Some tips

1. Use PascalCase for React based components
2. Use camelCase for everything else.
3. Use index.tsx for entry point, with only export
4. Use component name for main file

```typescript
// index.ts
export { Textfield } from './Textfield.tsx';
```

5. Avoid default export, use named-export only
6. Use one UI library and follow it strictly
   7
