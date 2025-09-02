# Concept Nexus
A full-stack web application that serves as an interactive portal to the ConceptNet knowledge graph, featuring a RESTful API and a dynamic front-end with educational games. This project is a complete rebuild of a university assignment, focusing on modern development practices, a decoupled architecture, and a professional code structure.

Table of Contents
- About The Project

- Tech Stack

- Project Structure

- Features

- Getting Started

 - Prerequisites

- Installation

- API Documentation

- Roadmap

## About The Project
Concept Nexus is a web application designed to explore the vast ConceptNet 5 knowledge graph. Users can query concepts, discover relationships between them, and solidify their learning through interactive games.

The application is built with a modern, decoupled architecture:

A backend REST API built with Node.js and Express, responsible for all business logic, database interactions, and communication with the external ConceptNet API.

A frontend Single-Page Application (SPA) built with React, providing a seamless and responsive user experience.

## Tech Stack
Tech Stack
This project utilizes a modern and robust set of technologies:

#### Backend
- Runtime: Node.js

- Framework: Express.js

- Language: TypeScript

- Database: MySQL

- ORM: Prisma

#### Frontend
- Library: React

- Build Tool: Vite

- Routing: React Router

- Styling: (To be decided - e.g., Tailwind CSS, Styled Components)

#### Project Structure
The repository is organized as a monorepo with two main directories:
```
├── server/ # The Node.js + Express.js backend application
└── client/ # The React frontend application
```
#### Features
(We will update this section as we build out the features)

- [ ] User Authentication: Secure login and session management.

- [ ] ConceptNet Browser: Dynamically query and display concepts and relations.

- [ ] Local Database: Caches interesting facts from ConceptNet into a MySQL database.

- [Game: "Who am I"] A timed game to guess a concept from clues.

- [Game: "Related Concepts"] A timed game to find words related to a given concept.

- [ ] REST API: A well-documented API to interact with the local database.

#### Getting Started
(This section will be updated with detailed instructions)

#### Prerequisites
- Node.js (v18.x or higher)

- npm / yarn / pnpm

- MySQL Server

#### Installation
Clone the repo:

`git clone [https://github.com/your-username/concept-nexus.git](https://github.com/your-username/concept-nexus.git)`

Setup backend dependencies...

Setup frontend dependencies...

#### API Documentation
The REST API documentation will be available via a /api/docs endpoint once the server is running.

#### Roadmap
See the open issues for a list of proposed features and known issues.
