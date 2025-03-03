# User List Management App

A React application for managing a list of users. It allows adding, editing, deleting, and viewing detailed information about users. The app uses SoftUni Practice Server, running on `localhost:3030`.

## Features
- **View Users**: Displays a list of all users.
- **Add User**: Allows adding a new user.
- **Edit User**: Allows editing an existing user.
- **Delete User**: Allows deleting a user from the list.
- **User Details**: Shows a modal with detailed information about a selected user.

## Project Structure
- **`src/`**: Contains the main application code.
  - **`components/`**: React components.
    - `Footer.jsx`, `Header.jsx`, `Pagination.jsx`, `Search.jsx`, `UserCreate.jsx`, `UserInfo.jsx`, `UserList.jsx`, `UserListItem.jsx`
  - **`services/`**: Logic for backend communication.
    - `userService.js`
  - **`utils/`**: Helper functions.
    - `dateTimeUtils.js`
  - `App.css`, `App.jsx`, `main.jsx`
- **`server/`**: Backend server (if needed).
  - `data/`
    - `users.json`
  -  `server.js`

## Technologies
- React - JavaScript library for building user interfaces.
- Vite - Fast development tool for React apps.
- SoftUni Practice Server - Backend server
- HTML/CSS - For structure and styling.