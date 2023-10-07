# Todo list with VITE + Vue3 + Tailwindcss 8-)

## Tech used

- Vitejs
- Vue3
- Composition API
- Tailwindcss
- Typescript
- headlessui
- heroicons
- pinia

## setup

Git

```
git checkout -b main
```

step 1

```
npm install
```

step 2

```
npm run dev
```

::: warning
_should run on http://localhost:5173/ by default_
:::

## Features

- A field to enter a new task
- when added a task, the list of tasks will be shown in a table
- Each list item has 3 buttons completed (a switch), Edit (edit icon), Delete (trash icon)
- Edit and delete button will both open a modal box to ask the user for confirmation
- At the top there is a counter of the number of the not completed tasks
- Button "clear all completed" will reset all tasks if the switch is set to completed
- Responsive
- Pinia is used to encapsulates the business logic for CRUD of tasks

## Future improvements

- Break all the CRUD function into components(much cleaner)
- Better ui/ux
- Make the app PWA(works offline)
- Add snackbar component to give more information to the user when updating something on the page

## REFERENCE

- **[Tailwind + Vite + Vue3](https://tailwindcss.com/docs/guides/vite)**
- **[Vue3](https://vuejs.org/)**
- **[Heroicons](https://heroicons.com/)**
- **[Headlessui](https://headlessui.com/)**
