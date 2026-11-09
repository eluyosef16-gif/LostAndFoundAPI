# Lost and Found Backend API

A RESTful backend API for managing lost and found items, built with **Node.js, Express.js, and MySQL**.

## Features

- Add new items
- View all items
- View an item by ID
- Update item details
- Delete items
- Input validation and error handling

## Technologies

- Node.js
- Express.js
- MySQL
- Postman

## Setup

1. Clone the repository:

```
git clone https://github.com/eluyosef16-gif/LostAndFoundAPI.git
```

2. Install dependencies:

```
npm install
```

3. Configure your `.env` file with your MySQL credentials.
4. Execute `database.sql` in MySQL Workbench.
5. Start the server:

```
npm run dev
```

Server URL: `http://localhost:3000`

## API Endpoints

| Method | Endpoint         | Description    |
| ------ | ---------------- | -------------- |
| GET    | `/api/items`     | Get all items  |
| GET    | `/api/items/:id` | Get item by ID |
| POST   | `/api/items`     | Add an item    |
| PUT    | `/api/items/:id` | Update an item |
| DELETE | `/api/items/:id` | Delete an item |

## Testing

Import `Lost and Found API.postman_collection.json` into Postman to test the endpoints.

