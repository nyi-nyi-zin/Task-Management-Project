# Task Management App

This project is a productivity app similar to Notion, designed for users who want to take notes, organize tasks, and manage projects all in one place. It’s ideal for students, professionals, and teams seeking a flexible and intuitive workspace for better information management and collaboration.

## Tech Stack

**Client:** React, Redux, TailwindCSS, MUI

**Server:** Node, Express

**Database:** Mysql

## Prerequisites

- Node.js >= 18
- npm
- Mysql (for database)

## Installation

Clone the repository

```bash
git clone https://github.com/nyi-nyi-zin/TaskManagement-Project.git
cd TaskManagement-Project
```

Install dependencies

```bash
npm install
```

Environment variables setup (.env)

```bash
Create a `.env` file in both client folder & server

Client .env => VITE_SERVER_URL=http://localhost:4000

Server .env => PORT=4000
JWT_SECRET=your_jwt_secret
```

Run the project

```
# For development
npm run dev

# For production
npm start
```

## Features

- Users can create Many boards

- Each board can have multiple lists

- Each list can have various tasks/cards

- Each Card can have card title & description

- Users can CRUD boards, lists, and tasks/cards.

- Authentication (Login/Register)

- Responsive frontend UI

- Protected routes with authMiddleware to prevent access from route path without login token

- loading state" handling

- Prevent multiple submission

- Conditional Rendering

## Demo

https://task-management-project-7azxa2y5a-nyi-nyi-zins-projects.vercel.app/

## Authors

- [Nyi Nyi Zin](https://github.com/nyi-nyi-zin)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

##Client##

`VITE_SERVER_URL`

##Server##

`ANOTHER_API_KEY`

`PORT`

`JWT_SECRET`

`DB_NAME`

`DB_USER`

`DB_PASS`

`DB_HOST`
