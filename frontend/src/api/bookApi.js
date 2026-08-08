import api from "./axios";



// =====================================
// Add New Book
// =====================================

export const addBook = async (bookData) => {

  const response = await api.post(

    "/books",

    bookData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }

  );


  return response.data;

};




// =====================================
// Get All Books
// =====================================

export const getBooks = async (params = {}) => {

  const response = await api.get(

    "/books",

    {
      params,
    }

  );


  return response.data;

};




// =====================================
// Get Single Book
// =====================================

export const getBookById = async (id) => {

  const response = await api.get(

    `/books/${id}`

  );


  return response.data;

};




// =====================================
// Update Book
// =====================================

export const updateBook = async (id, bookData) => {

  const response = await api.put(

    `/books/${id}`,

    bookData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }

  );


  return response.data;

};




// =====================================
// Delete Book
// =====================================

export const deleteBook = async (id) => {

  const response = await api.delete(

    `/books/${id}`

  );


  return response.data;

};