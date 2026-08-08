import axios from "axios";

const API_URL = "http://localhost:5000/api/borrow";

// =====================================
// Issue Book
// Admin / Librarian
// =====================================

export const issueBook = async (userId, bookId) => {
const token = localStorage.getItem("token");

const response = await axios.post(
`${API_URL}/issue`,
{
userId,
bookId,
},
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

return response.data;
};

// =====================================
// Student Borrow Book
// Student only
// =====================================

export const studentBorrowBook = async (bookId) => {
const token = localStorage.getItem("token");

const response = await axios.post(
`${API_URL}/student`,
{
bookId,
},
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

return response.data;
};

// =====================================
// Get All Borrow Records
// Admin / Librarian
// =====================================

export const getAllBorrows = async () => {
const token = localStorage.getItem("token");

const response = await axios.get(
`${API_URL}`,
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

return response.data;
};

// =====================================
// Return Book
// Admin / Librarian
// =====================================

export const returnBook = async (borrowId) => {
const token = localStorage.getItem("token");

const response = await axios.post(
`${API_URL}/return`,
{
borrowId,
},
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

return response.data;
};

// =====================================
// Student Return Book
// Student: Own Book Only
// =====================================

export const studentReturnBook = async (borrowId) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/student/return`,
    {
      borrowId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// =====================================
// Get Borrow History
// Student: Own History
// Admin/Librarian: Any User
// =====================================

export const getBorrowHistory = async (userId) => {
const token = localStorage.getItem("token");

const response = await axios.get(
`${API_URL}/history/${userId}`,
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

return response.data;
};
