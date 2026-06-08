# Todo List

A Todo List application built with JavaScript, Webpack, and localStorage as part of **The Odin Project** curriculum.

## Overview

This project allows users to organize tasks into projects, manage priorities and due dates, and persist data using the browser's local storage.

The main goal of the project is to practice:

- JavaScript modules
- Object-oriented design
- Application architecture
- DOM manipulation
- State management
- Data persistence with localStorage
- Webpack workflow

## Features

- Create projects
- Create todos within projects
- Edit todo details
- Delete todos
- Mark todos as completed
- Set task priorities
- Store data in localStorage
- Automatically restore saved data on page reload

## Built With

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Webpack
- localStorage
- date-fns

## Getting Started

### Clone the Repository

```bash
git clone <repository-url>
cd todo-list
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Create Production Build

```bash
npm run build
```

## Project Structure

```text
src/
├── assets/
├── components/
├── modules/
│   ├── Todo.js
│   ├── Project.js
│   ├── todoApp.js
│   ├── storage.js
│   └── dom.js
├── index.js
├── styles.css
└── template.html
```

## Learning Outcomes

Through this project I practiced:

- Designing data models
- Separating application logic from presentation logic
- Managing application state
- Working with browser storage APIs
- Organizing larger JavaScript projects with modules
- Using Webpack for development and production builds

## Future Improvements

- Task filtering by priority
- Task filtering by due date
- Search functionality
- Drag and drop task organization
- Dark mode
- Responsive mobile layout

## Screenshots

### Main Interface

![Application Screenshot](./screenshots/main.png)

## Live Demo

Coming soon.

## Acknowledgments

This project was completed as part of **The Odin Project** JavaScript curriculum.

- The Odin Project
- date-fns
