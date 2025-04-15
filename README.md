# 📚 Library Application

A full-stack **Library Management System** built with **MERN Stack (MongoDB, Express, React, Node.js)** and **Redux Toolkit**, featuring JWT authentication, role-based routing, file uploads, and more.

---

## 🚀 Features

### ✅ Backend (Node.js + Express + MongoDB)
- User Registration & Login with **JWT Authentication**
- Secure Password Handling using **bcrypt**
- **CRUD operations** for managing Books
- Upload book cover images using **Multer**
- Role-based access using **JWT Middleware**
- MongoDB integration via **Mongoose**

### ✅ Frontend (React + Redux Toolkit)
- Authentication flow (Login / Logout)
- **Redux Toolkit** for state management
- Role-based & protected routes
- **Lazy loading** and **nested routing**
- Form submission with validation
- Upload images and preview
- Clean and responsive UI

---

## 📁 Project Structure

### Backend
```
server/
├── config/
│   └── db.js
├── controllers/
│   ├── userController.js
│   └── bookController.js
├── middleware/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
├── models/
│   ├── userModel.js
│   └── bookModel.js
├── routes/
│   ├── userRoutes.js
│   └── bookRoutes.js
├── uploads/
├── .env
└── server.js
```

### Frontend
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
│   └── App.jsx
├── public/
└── vite.config.js
```

---

## ⚙️ Installation & Running

### 1. Clone the repository
```bash
git clone https://git@github.com:DineshGandham/Library-application.git
cd library-application
```

### 2. Setup Environment Variables
Create a `.env` file at the project root:
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

> ✅ `MONGO_URI` and `JWT_SECRET` are used to connect to MongoDB and for generating JWT tokens securely.

### 3. Install Dependencies (Common for both Client and Server)
```bash
npm install
```

### 4. Start the Application
```bash
npm run dev
```
> 📦 A common `package.json` is provided to run both server and client concurrently.

---

## 🔐 Authentication

- JWT stored in localStorage
- Routes protected via `authMiddleware.js`
- Role-based routing and access

---

## ✉️ File Upload

- Upload cover images with book entries
- Stored in `uploads/` folder
- Image paths handled dynamically in the UI

---

## 🧰 Tech Stack

- **Frontend**: React, Redux Toolkit, React Router DOM v6, Vite
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcryptjs
- **File Upload**: Multer

---

## 🛠️ Future Improvements

- User roles: Admin dashboard
- Pagination and filtering for books
- Image hosting with Cloudinary/S3
- Notifications and loading spinners
- Testing with Jest and Postman collections

---


## 👨‍💻 Author

**Dinesh Gandham**  
GitHub: [@DineshGandham](https://github.com/DineshGandham)

---

