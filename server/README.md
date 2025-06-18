# Library Management System - Server

This is the backend server for the Library Management System built with Node.js, Express, and MongoDB.

## Features

- RESTful API endpoints for books and members management
- User authentication and authorization
- Role-based access control
- Dashboard statistics
- Error handling and logging
- MongoDB integration with Mongoose
- TypeScript support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the server directory:
   ```bash
   cd server
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file based on `.env.example` and update the variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/library
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   NODE_ENV=development
   ```

## Development

Start the development server:
```bash
npm run dev
```

## Production

Build the TypeScript code:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user

### Books
- GET /api/books - Get all books
- GET /api/books/:id - Get book by ID
- POST /api/books - Create new book
- PUT /api/books/:id - Update book
- DELETE /api/books/:id - Delete book
- GET /api/books/search/:query - Search books

### Members
- GET /api/members - Get all members
- GET /api/members/:id - Get member by ID
- POST /api/members - Create new member
- PUT /api/members/:id - Update member
- DELETE /api/members/:id - Delete member
- GET /api/members/search/:query - Search members

### Dashboard
- GET /api/dashboard/stats - Get dashboard statistics (admin/librarian only)

## Error Handling

The API uses a centralized error handling mechanism with custom error classes and middleware.

## Logging

The application uses Winston for logging. Logs are stored in:
- `logs/error.log` - Error logs
- `logs/combined.log` - All logs

## Security

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Helmet for security headers
- CORS enabled

## Testing

Run tests:
```bash
npm test
```

## License

MIT 