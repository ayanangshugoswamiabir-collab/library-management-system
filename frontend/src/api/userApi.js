import api from "./axios";


// =====================================
// Get All Users
// =====================================

export const getUsers = async () => {

  const response = await api.get(
    "/users"
  );

  return response.data;

};


// =====================================
// Get Single User
// =====================================

export const getUserById = async (id) => {

  const response = await api.get(
    `/users/${id}`
  );

  return response.data;

};


// =====================================
// Update User
// =====================================

export const updateUser = async (id, userData) => {

  const response = await api.put(
    `/users/${id}`,
    userData
  );

  return response.data;

};


// =====================================
// Delete User
// =====================================

export const deleteUser = async (id) => {

  const response = await api.delete(
    `/users/${id}`
  );

  return response.data;

};


// =====================================
// Upload Profile Image
// =====================================

export const uploadProfileImage = async (formData) => {

  const response = await api.put(
    "/users/profile-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;

};
