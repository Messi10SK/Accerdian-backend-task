# Accredian Backend Task

This repository contains the backend code for the Refer & Earn landing page. The backend is built using Node.js, Express.js, and Prisma for database connectivity with MySQL.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [License](#license)

## Getting Started

These instructions will help you set up and run the backend server on your local machine.

## Prerequisites

Make sure you have the following installed:

- Node.js
- MySQL

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Messi10SK/Accredian-backend-task.git
    cd Accredian-backend-task
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

## Running the Server

1. Start your MySQL server and create a new database.

2. Run the Prisma migration to set up the database schema:

    ```sh
    npx prisma migrate dev --name init
    ```

3. Start the server:

    ```sh
    npm start
    ```

The server should now be running on `http://localhost:PORT`.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

