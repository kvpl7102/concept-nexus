# Concept Nexus

A full-stack web application that serves as an interactive portal to the ConceptNet knowledge graph, featuring a RESTful API and a dynamic front-end with educational games. This project is a complete rebuild of a university assignment, focusing on modern development practices, a decoupled architecture, and a professional code structure.

## Table of Contents
- [About The Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Documentation](#api-documentation)
- [Roadmap](#roadmap)

## About The Project

Concept Nexus is a web application designed to explore the vast ConceptNet 5 knowledge graph. Users can query concepts, discover relationships between them, and solidify their learning through interactive games.

The application is built with a modern, decoupled architecture:
*   A **backend REST API** built with Node.js and Express, responsible for all business logic, database interactions, and communication with the external ConceptNet API.
*   A **frontend Single-Page Application (SPA)** built with React (using Next.js), providing a seamless and responsive user experience.

## Tech Stack

This project utilizes a modern and robust set of technologies:

#### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Prisma
- **API Documentation**: Swagger (OpenAPI)

#### Frontend
- **Framework**: Next.js (React)
- **Language**: TypeScript
- **Styling**: CSS Modules (with PostCSS)

## Project Structure

The repository is organized as a monorepo with two main directories:

```
concept-nexus/
├── backend/      # The Node.js + Express.js backend application
└── frontend/     # The Next.js frontend application
```

## Features

- [x] **User Authentication**: Secure JWT-based login and session management.
- [x] **ConceptNet Browser**: Dynamically query and display concepts and relations.
- [x] **Local Database**: Caches interesting facts from ConceptNet into a MySQL database.
- [x] **Game: "Who am I?"**: A timed game to guess a concept from clues.
- [ ] **Game: "Related Concepts"**: A timed game to find words related to a given concept.
- [x] **REST API**: A well-documented API to interact with the local database and ConceptNet.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js (v18.x or higher)
- npm (v8.x or higher)
- MySQL Server

### Installation

1.  **Clone the repo:**
    ```sh
    git clone https://github.com/your-username/concept-nexus.git
    cd concept-nexus
    ```

2.  **Set up the Backend:**
    ```sh
    cd backend
    npm install
    ```
    - Create a `.env` file in the `backend` directory and add your `DATABASE_URL`.
    `DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"`
    - Run the database migrations:
    ```sh
    npx prisma migrate dev
    ```
    - (Optional) Seed the database with initial data:
    ```sh
    npx prisma db seed
    ```
    - Start the development server:
    ```sh
    npm run dev
    ```

3.  **Set up the Frontend:**
    ```sh
    cd ../frontend
    npm install
    ```
    - Start the development server:
    ```sh
    npm run dev
    ```

## API Documentation

The REST API is documented using Swagger. Once the backend server is running, the interactive documentation can be accessed at:
[http://localhost:5001/api-docs](http://localhost:5001/api-docs)
<img width="1919" height="932" alt="image" src="https://github.com/user-attachments/assets/65370f7d-4e88-4bc7-a4df-ca550e375b0d" />


## Roadmap

See the [open issues](https://github.com/your-username/concept-nexus/issues) for a list of proposed features and known issues.
