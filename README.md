
# 📚 Library Management System

A full-stack, role-based Library Management System built with the **MERN stack**, designed to manage books, users, borrowing workflows, inventory, authentication, dashboards, and library operations through a modern web interface.

The system provides separate capabilities for **Administrators, Librarians, and Students**, with secure authentication, role-based authorization, automated borrowing workflows, cloud-based image storage, analytics dashboards, and documented REST APIs.

---

## 🚀 Project Overview

The Library Management System is a production-oriented full-stack web application that digitizes common library operations.

Instead of relying on simple CRUD operations, the system implements real-world business workflows such as:

* Role-based access control
* Secure authentication
* Book inventory management
* Borrowing and returning workflows
* Due-date calculation
* User management
* Dashboard analytics
* Book cover and profile image uploads
* Email-based account functionality
* API documentation
* QR code generation
* Search, filtering, sorting, and pagination

The project is designed with a clear separation between the **React frontend**, **Node.js/Express backend**, and **MongoDB database**.

---

# ✨ Key Features

## 🔐 Authentication & Authorization

* User registration
* Secure password hashing using bcrypt
* JWT-based authentication
* Protected routes
* Role-based authorization
* Email verification
* Forgot password functionality
* Password reset functionality
* Authentication middleware
* Role-based frontend navigation

### Supported Roles

| Role         | Capabilities                                             |
| ------------ | -------------------------------------------------------- |
| 👑 Admin     | Manage users, books, library operations and dashboards   |
| 📖 Librarian | Manage books, borrowing and library operations           |
| 🎓 Student   | Browse books, borrow books and manage borrowing activity |

---

# 📚 Book Management

The system provides complete book lifecycle management.

### Features

* Add books
* Edit books
* Delete books
* View book details
* Book cover upload
* ISBN validation
* Category management
* Author information
* Publisher information
* Available-copy tracking
* QR code generation
* Search books
* Filter by category
* Sort books
* Pagination

### Book Inventory Workflow

```text
Book Added
    ↓
Total Copies Stored
    ↓
Student Borrows Book
    ↓
Available Copies Decrease
    ↓
Student Returns Book
    ↓
Available Copies Increase
```

---

# 🔄 Borrowing & Return System

The borrowing system implements real-world library business logic.

When a student borrows a book, the backend:

1. Validates the authenticated user
2. Validates the requested book
3. Checks available copies
4. Creates a borrowing record
5. Calculates the due date
6. Decreases available copies

When the book is returned:

1. Borrowing record is updated
2. Return information is stored
3. Available copies are increased

### Borrowing Information

The system tracks information such as:

* Borrower
* Book
* Borrow date
* Due date
* Return date
* Borrowing status

---

# 📊 Dashboard & Analytics

Different roles receive role-specific dashboard experiences.

### Dashboard Features

* Total users
* Total books
* Borrowing statistics
* Return statistics
* Recent activities
* Popular books
* Monthly borrowing statistics
* Category distribution
* Role-specific dashboard information

Charts are implemented to provide a visual overview of library activity.

---

# ☁️ Cloud Image Management

The application integrates **Cloudinary** for cloud-based media storage.

Used for:

* Book cover images
* User profile images

This avoids storing uploaded images directly inside the application server.

---

# 📧 Email System

The backend includes email-related functionality for account workflows.

Supported functionality includes:

* Email verification
* Password reset
* Account-related email communication
* Borrowing-related notification infrastructure

---

# 📖 API Documentation

The backend REST APIs are documented using **Swagger/OpenAPI**.

The API documentation provides:

* Available endpoints
* HTTP methods
* Request parameters
* Request bodies
* Authentication requirements
* Response structures
* JWT authorization support

Swagger can be used to interactively test the backend APIs.

---

# 🔳 QR Code Generation

Books can have QR codes generated from their associated information.

This provides a foundation for faster book identification and future library scanning workflows.

---

# 🛡️ API & Backend Architecture

The backend follows a modular architecture separating responsibilities across:

```text
Routes
   ↓
Controllers
   ↓
Models
   ↓
Middleware
   ↓
Database
```

Major backend responsibilities include:

* Authentication
* Authorization
* User management
* Book management
* Borrowing management
* Dashboard APIs
* Email services
* Image upload handling
* Error handling

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      React UI        │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │       Backend        │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌────────────┐   ┌─────────────┐  ┌─────────────┐
       │ MongoDB    │   │ Cloudinary  │  │ Email       │
       │ Atlas      │   │             │  │ Service     │
       └────────────┘   └─────────────┘  └─────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React
* JavaScript

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* dotenv
* CORS
* Cookie Parser

## Cloud & Services

* MongoDB Atlas
* Cloudinary
* Email service

## API & Development

* Swagger / OpenAPI
* Postman
* Git
* GitHub
* Nodemon

---

# 📂 Project Structure

```text
Project1/
│
├── backend/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   │
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── README.md
└── .gitignore
```

> Folder names may vary slightly depending on the final project structure.

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate into the project:

```bash
cd Project1
```

---

# 🔧 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

Start the development server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

# 💻 Frontend Setup

Open another terminal.

Navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔑 Environment Variables

Never commit your real `.env` files to GitHub.

The following values should be configured locally:

| Variable                | Purpose                     |
| ----------------------- | --------------------------- |
| `MONGO_URI`             | MongoDB database connection |
| `JWT_SECRET`            | JWT signing secret          |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account          |
| `CLOUDINARY_API_KEY`    | Cloudinary API key          |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret       |
| `EMAIL_USER`            | Email service account       |
| `EMAIL_PASSWORD`        | Email service credentials   |

Add `.env` to `.gitignore`.

---

# 🧪 API Testing

Backend APIs can be tested using:

* Postman
* Swagger UI

Important API categories include:

```text
Authentication APIs
User APIs
Book APIs
Borrowing APIs
Dashboard APIs
Upload APIs
```

---

# 🔒 Security Considerations

The application implements several security-oriented practices:

* Password hashing with bcrypt
* JWT authentication
* Protected API routes
* Role-based authorization
* Environment variables for secrets
* Input validation
* Authentication middleware
* Restricted access to role-specific operations

---

# 🎨 User Interface

The frontend focuses on a modern application experience with:

* Modern dashboard
* 3D-inspired UI elements
* Interactive cards
* Charts and analytics
* Book management interface
* Custom success notifications
* Loading states
* Skeleton loading interfaces
* Form validation
* Error handling
* Interactive navigation

---

# 📱 User Flows

## Student

```text
Register
   ↓
Verify Account
   ↓
Login
   ↓
Browse Books
   ↓
Search / Filter
   ↓
View Book Details
   ↓
Borrow Book
   ↓
Track Borrowing
   ↓
Return Book
```

## Librarian

```text
Login
   ↓
Dashboard
   ↓
Manage Books
   ↓
Issue Books
   ↓
Track Borrowing
   ↓
Process Returns
```

## Admin

```text
Login
   ↓
Admin Dashboard
   ↓
Manage Users
   ↓
Manage Books
   ↓
Monitor Library Activity
   ↓
View Analytics
```

---

# 🚀 Future Improvements

Potential future improvements include:

* Automated overdue detection
* Automated overdue email reminders
* Audit logging
* Advanced analytics
* Book recommendation system
* Advanced notification system
* Real-time notifications
* Automated report generation
* Automated testing
* CI/CD pipeline
* Docker containerization
* Advanced search using NLP/AI

---

# 📈 Learning Outcomes

This project demonstrates practical experience with:

* Full-stack JavaScript development
* REST API development
* MongoDB database design
* Authentication and authorization
* Role-based access control
* Backend business logic
* File uploads
* Cloud services
* API documentation
* Frontend state management
* Responsive UI concepts
* Dashboard development
* Git/GitHub workflow
* Application architecture

---

# 👨‍💻 Developer

**Ayanangshu Goswami**

B.Tech — Information Technology

Interested in:

* Full-Stack Development
* Artificial Intelligence
* Machine Learning
* Backend Engineering
* Software Engineering

---

# ⭐ Project Status

🚧 **Actively developed and continuously improved**

The project is being enhanced with additional UI/UX improvements, loading experiences, testing, deployment, and production-oriented features.

---

## ⭐ If you find this project useful

Consider giving the repository a ⭐ on GitHub.
