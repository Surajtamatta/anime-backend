# Webtoon/Anime  API

This is a RESTful API built using **Node.js**, **Express**, and **MongoDB** to manage a collection of webtoons. The API supports adding, fetching, and managing webtoons, including their title, summary, characters, and image URL.

## Features

- **Add Webtoons**: Add new webtoons with a title, summary, list of characters, and an optional image URL.
- **Retrieve Webtoons**: Fetch all webtoons or individual webtoons by their ID.
- **Update Webtoons**: Update details of an existing webtoon.
- **Delete Webtoons**: Delete a webtoon from the database.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store webtoon data.
- **Mongoose**: ODM for MongoDB.
- **JWT (JSON Web Tokens)**: Authentication mechanism.

## Installation

### Prerequisites

- **Node.js** (>=14.x)
- **MongoDB** (local or MongoDB Atlas)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Surajtamatta/anime-backend.git
   cd webtoon-api


2. **Install dependencies**:
    npm install

3. **Set up environment variables**:
 Create a .env file in the root directory and add the following variables:

PORT=8000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d


Run the application:
4.**Run the application**:

npm start
The server will start on http://localhost:8000.

### What was added:

1. **Postman API Links**: Added links to test specific API endpoints directly in Postman, such as:
   - Add Webtoon
   - Get All Webtoons
   - Get Webtoon by ID
   - Update Webtoon
   - Delete Webtoon

2. **Postman Collection**: Added a link to a complete Postman collection for easier interaction with the API.

This should make it easy for developers to test the API and understand the endpoints with Postman.

