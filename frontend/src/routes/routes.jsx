
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

import AddBook from "../pages/AddBook";
import Books from "../pages/Books";
import BookDetails from "../pages/BookDetails";
import EditBook from "../pages/EditBook";

import IssueBook from "../pages/IssueBook";
import Borrow from "../pages/Borrow";
import MyBorrowedBooks from "../pages/MyBorrowedBooks";

import Users from "../pages/Users";
import Settings from "../pages/Settings";

import ProtectedRoute from "../components/auth/ProtectedRoute";


const router = createBrowserRouter([

  // =====================================
  // PUBLIC ROUTES
  // =====================================

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },


  // =====================================
  // PROTECTED ROUTES
  // =====================================

  {
    path: "/",

    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),

    children: [

      // =====================================
      // DASHBOARD
      // =====================================

      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "dashboard",
        element: <Dashboard />,
      },


      // =====================================
      // BOOK MANAGEMENT
      // =====================================

      {
        path: "add-book",
        element: <AddBook />,
      },

      {
        path: "books",
        element: <Books />,
      },

      {
        path: "books/:id",
        element: <BookDetails />,
      },

      {
        path: "books/:id/edit",
        element: <EditBook />,
      },


      // =====================================
      // BORROWING SYSTEM
      // =====================================

      // Admin / Librarian borrowing dashboard

      {
        path: "borrow",
        element: <Borrow />,
      },


      // Admin / Librarian manually issue a book

      {
        path: "issue-book",
        element: <IssueBook />,
      },


      // =====================================
      // STUDENT BORROWED BOOKS
      // =====================================

      {
        path: "my-borrowed-books",
        element: <MyBorrowedBooks />,
      },


      // =====================================
      // USER MANAGEMENT
      // =====================================

      {
        path: "users",
        element: <Users />,
      },


      // =====================================
      // SETTINGS
      // =====================================

      {
        path: "settings",
        element: <Settings />,
      },

    ],
  },

]);


export default router;
