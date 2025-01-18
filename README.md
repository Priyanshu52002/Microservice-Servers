# Microservices Project: Main Service & Public API Microservice

## Overview

This project consists of two microservices:
1. **Main Service**: Manages user authentication and authorization using JWT (JSON Web Token).
2. **Public API Microservice**: Provides access to specific routes via API key without requiring traditional login credentials.

The services are designed to communicate and function independently to demonstrate microservice architecture.

---

## Prerequisites

Ensure the following are installed on your system:
- **Node.js**: [Download here](https://nodejs.org/)
- **npm**: Comes bundled with Node.js
- **MongoDB**: A cloud-hosted MongoDB instance or local installation

---

## Environment Variables

### Main Service `.env` File

```
PORT=8000
MONGO_CONNECTION_URL=your_connection_string_url_here
JWT_SECRET_KEY=your_secret_key_here
```

### Public API Microservice `.env` File

```
PORT=5000
```
---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Priyanshu52002/Microservice-Servers.git
```

### 2. Navigate to the Project Directory

```bash
cd Microservice-Servers
```

### 3. Install Dependencies

#### For Main Service

```bash
cd MainService
npm install
```

#### For Public API Microservice

```bash
cd ../PublicService
npm install
```

### 4. Start the Services

#### Start Main Service

```bash
cd MainService
npm start
```

The Main Service will run on `http://localhost:8000`.

#### Start Public API Microservice

```bash
cd ../PublicService
npm start
```

The Public API Microservice will run on `http://localhost:5000`.

---

## API Endpoints

### Main Service Endpoints

1. **Register a New User**
   - **Endpoint**: `POST /api/register`
   - **Description**: Registers a new user and returns a message and api_key.
   - **Request Body**:
     ```json
     {
       "first_name": "Ravi",
       "last_name": "Kumar",
       "email": "ravi.kumar@example.com",
       "password": "password123"
     }
     ```

2. **User Login**
   - **Endpoint**: `POST /api/login`
   - **Description**: Authenticates a user and returns a JWT.
   - **Request Body**:
     ```json
     {
       "email": "ravi.kumar@example.com",
       "password": "password123"
     }
     ```

3. **Add a Candidate** (Protected Route)
   - **Endpoint**: `POST /api/candidate`
   - **Description**: Adds a candidate to the database.
   - **Request Headers**:
     ```
     Authorization: Bearer <JWT Token>
     ```
   - **Request Body**:
     ```json
     {
       "first_name": "Anita",
       "last_name": "Sharma",
       "email": "anita.sharma@example.com"
     }
     ```

4. **Get Candidates for Logged-In User** (Protected Route)
   - **Endpoint**: `GET /api/candidate`
   - **Description**: Retrieves candidates added by the authenticated user.
   - **Request Headers**:
     ```
     Authorization: Bearer <JWT Token>
     ```

### Public API Microservice Endpoints

1. **Fetch User Profile**
   - **Endpoint**: `GET /api/public/profile`
   - **Description**: Retrieves the profile information of the user associated with the provided API key.
   - **Query Parameter**:
     ```
     api_key: <API Key>
     ```

2. **Fetch All Candidates**
   - **Endpoint**: `GET /api/public/candidates`
   - **Description**: Retrieves all candidates associated with the user of the provided API key.
   - **Query Parameter**:
     ```
     api_key: <API Key>
     ```

---

## Database Schema

### MongoDB Collections

#### Users Collection

| Field         | Type    | Description          |
|---------------|---------|----------------------|
| `id`          | String  | Unique identifier    |
| `first_name`  | String  | User's first name    |
| `last_name`   | String  | User's last name     |
| `email`       | String  | User's email address |
| `password`    | String  | Hashed password      |

#### Candidates Collection

| Field         | Type    | Description          |
|---------------|---------|----------------------|
| `id`          | String  | Unique identifier    |
| `first_name`  | String  | Candidate's first name |
| `last_name`   | String  | Candidate's last name |
| `email`       | String  | Candidate's email address |
| `user_id`     | String  | Owner's user ID      |

---

## Notes

- Use tools like [Postman](https://www.postman.com/) to test the endpoints.
- Follow best practices for error handling and logging.

---

## Future Enhancements

- Can Add more validation for user input.
- Can Implement rate limiting for public API endpoints.
- Can Enhance error handling for better debugging.
- Can Deploy the services using Docker for better scalability.
