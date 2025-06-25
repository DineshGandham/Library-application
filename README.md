# 📚 Library Application

A full-stack **Library Management System** built with **MERN Stack (MongoDB, Express, React, Node.js)** and **Redux Toolkit**, featuring JWT authentication, role-based routing, file uploads, and **Docker containerization** for seamless development and deployment.

---

## 🚀 Features

### ✅ Backend (Node.js + Express + MongoDB + TypeScript)
- User Registration & Login with **JWT Authentication**
- Secure Password Handling using **bcrypt**
- **CRUD operations** for managing Books
- Upload book cover images using **Multer**
- Role-based access using **JWT Middleware**
- MongoDB integration via **Mongoose**
- **TypeScript** for type safety and better development experience
- **Nodemon** for hot reloading during development

### ✅ Frontend (React + Redux Toolkit + TypeScript + Vite)
- Authentication flow (Login / Logout)
- **Redux Toolkit** for state management
- Role-based & protected routes
- **Lazy loading** and **nested routing**
- Form submission with validation
- Upload images and preview
- Clean and responsive UI with **Material-UI** and **Tailwind CSS**
- **Vite** for fast development and optimized builds
- **TypeScript** for enhanced development experience
- **Framer Motion** for smooth animations

### ✅ DevOps & Containerization
- **Docker** containerization for both client and server
- **Docker Compose** for orchestrating multi-container setup
- **Hot reloading** support in Docker development environment
- **Volume mounting** for real-time code changes
- **MongoDB** containerized with persistent data storage
- **Network isolation** between services

---

## 📁 Project Structure

### Backend (TypeScript)
```
server/
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   │   ├── userController.ts
│   │   └── bookController.ts
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   └── uploadMiddleware.ts
│   ├── models/
│   │   ├── userModel.ts
│   │   └── bookModel.ts
│   ├── routes/
│   │   ├── userRoutes.ts
│   │   └── bookRoutes.ts
│   ├── scripts/
│   │   └── seed.ts
│   └── index.ts
├── uploads/
├── Dockerfile
├── .dockerignore
├── .env
├── tsconfig.json
└── package.json
```

### Frontend (React + TypeScript + Vite)
```
client/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   └── books/
│   ├── pages/
│   ├── routes/
│   ├── layouts/
│   ├── components/
│   └── App.tsx
├── public/
├── Dockerfile
├── .dockerignore
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

### Root Configuration
```
├── docker-compose.yml
├── docker-compose.client.yml (for testing)
├── .env.example
├── package.json
└── README.md
```

---

## ⚙️ Installation & Running

### 🐳 Docker Development (Recommended)

#### Prerequisites
- Docker Desktop installed
- Docker Compose installed

#### 1. Clone the repository
```bash
git clone https://github.com/DineshGandham/Library-application.git
cd library-application
```

#### 2. Setup Environment Variables
Create a `.env` file at the project root:
```env
# Database Configuration
MONGODB_URI=mongodb://mongodb:27017/library
MONGO_INITDB_DATABASE=library

# Server Configuration
NODE_ENV=development
PORT=3000

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Client Configuration
VITE_API_URL=http://localhost:3000
```

#### 3. Start with Docker (One Command)
```bash
# Build and start all services (MongoDB + Server + Client)
npm run docker:up:build

# Or start without building (after first run)
npm run docker:up
```

#### 4. Access Your Application
- **React Client (Vite)**: http://localhost:5173
- **Express Server**: http://localhost:3000
- **MongoDB**: localhost:27017

#### 5. Development Commands
```bash
# View logs from all services
npm run docker:logs

# Stop all services
npm run docker:down

# Restart services
npm run docker:restart

# Clean up Docker resources
npm run docker:clean
```

#### 6. Test Individual Services
```bash
# Test only client
npm run docker:test:client

# Start only database
docker-compose up mongodb

# Start only server
docker-compose up server
```

---

### 💻 Traditional Development (Without Docker)

#### 1. Setup Environment Variables
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/library
JWT_SECRET=your_jwt_secret
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Start MongoDB locally
```bash
# Make sure MongoDB is running on your system
mongod
```

#### 4. Start the Application
```bash
# Start both client and server concurrently
npm run dev

# Or start individually
npm run dev:client  # Vite dev server on port 5173
npm run dev:server  # Express server on port 3000
```

---

## 🐳 Docker Architecture

### Services
- **MongoDB**: Database service with persistent volume
- **Server**: Express.js API with TypeScript and hot reloading
- **Client**: React application with Vite and hot reloading

### Key Docker Features
- **Multi-stage builds** for optimized production images
- **Volume mounting** for development hot reloading
- **Network isolation** with custom Docker network
- **Environment variable** configuration
- **Persistent data storage** for MongoDB

### Docker Commands Reference
```bash
# Build all services
docker-compose build

# Start in detached mode
docker-compose up -d

# View logs for specific service
docker-compose logs -f server

# Execute commands in running container
docker exec -it library-server sh

# Remove all containers and networks
docker-compose down --remove-orphans
```

---

## 🔐 Authentication
- JWT stored in localStorage
- Routes protected via `authMiddleware.ts`
- Role-based routing and access
- Secure password hashing with bcrypt

---

## 📁 File Upload
- Upload cover images with book entries
- Stored in `uploads/` folder (mounted as Docker volume)
- Image paths handled dynamically in the UI
- Multer middleware for handling multipart/form-data

---

## 🧰 Tech Stack

### Frontend
- **React 19** with hooks and functional components
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Redux Toolkit** for state management
- **React Router DOM v7** for routing
- **Material-UI** for component library
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations
- **Axios** for API calls

### Backend
- **Node.js** with Express.js framework
- **TypeScript** for backend development
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads
- **Morgan** for logging
- **Helmet** for security headers
- **CORS** for cross-origin requests

### DevOps & Tools
- **Docker** & **Docker Compose** for containerization
- **Nodemon** for development hot reloading
- **ts-node** for running TypeScript directly
- **ESLint** for code linting
- **Jest** for testing (configured)
- **PM2** for production process management

---

## 🛠️ Development Workflow

### Making Changes
1. **Code Changes**: Edit files in `client/` or `server/` directories
2. **Hot Reloading**: Changes automatically reflect in running containers
3. **Database Changes**: MongoDB data persists between container restarts
4. **Debugging**: Use `npm run docker:logs` to view real-time logs

### Adding New Dependencies
```bash
# For client
cd client && npm install <package>

# For server  
cd server && npm install <package>

# Rebuild containers
npm run docker:up:build
```

---

## 🚀 Future Improvements

- [ ] **Production Docker setup** with multi-stage builds
- [ ] **CI/CD pipeline** with GitHub Actions
- [ ] **Kubernetes** deployment configurations
- [ ] **Redis** for session management and caching
- [ ] **Nginx** reverse proxy for production
- [ ] **SSL/TLS** certificates for HTTPS
- [ ] **Monitoring** with Prometheus and Grafana
- [ ] **Image hosting** with Cloudinary/AWS S3
- [ ] **Admin dashboard** with advanced features
- [ ] **Pagination and filtering** for books
- [ ] **Email notifications** for user actions
- [ ] **Testing suite** with Jest and Cypress
- [ ] **API documentation** with Swagger/OpenAPI

---

## 📊 Performance Features

- **Lazy loading** for React components
- **Code splitting** with Vite
- **Optimized Docker images** with Alpine Linux
- **Efficient database queries** with Mongoose
- **Static file serving** for uploads
- **GZIP compression** support

---

## 🔧 Troubleshooting

### Common Docker Issues

**Port already in use:**
```bash
# Check which process is using the port
lsof -i :5173
# Kill the process
kill -9 <PID>
```

**Hot reloading not working:**
- Ensure `usePolling: true` in vite.config.ts
- Check volume mounts in docker-compose.yml

**Database connection issues:**
- Verify MongoDB container is running: `docker ps`
- Check connection string in environment variables

**Container build failures:**
- Clear Docker cache: `docker system prune -a`
- Rebuild from scratch: `npm run docker:up:build`

---

## 👨‍💻 Author

**Dinesh Gandham**  
GitHub: [@DineshGandham](https://github.com/DineshGandham)  
Email: [dineshgandham99@gmail.com]

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⭐ Show Your Support

If this project helped you, please give it a ⭐ on GitHub!
