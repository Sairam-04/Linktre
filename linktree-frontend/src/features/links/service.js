import axios from "axios";
import { getUser } from "../../utils/localStorage";
const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URI;

const ALL_LINKS_URL = (username) => `get-all-links/${username}`;

// Method for Fetching All the Links
const fetchAllLinks = (username) => {
  const uri = `${BASE_URL}/${ALL_LINKS_URL(username)}`;
  return axios.get(uri, { params: { username: username } });
};

// Method for Adding Link
const addNewLink = (data) => {
  const uri = `${BASE_URL}/create-link`;
  return axios.post(uri, data, {
    headers: {
      "Content-Type": "application/json",
      "ltree-token": getUser()   
    },
  });
};

// Method for Deleting a Link
const deleteLink = (id) => {
  const uri = `${BASE_URL}/delete-link/${id}`;
  return axios.delete(uri, {
    headers: {
      "Content-Type": "application/json",
      "ltree-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQyZjE5ZGJhNDIyN2NlYWM0MTNmNTIiLCJ1c2VybmFtZSI6InNhaXJhbSIsImVtYWlsIjoic2FpcmFtMTAwQGdtYWlsLmNvbSIsImlhdCI6MTcxMDc4MDIwOSwiZXhwIjoxNzExMzg1MDA5fQ.0K7V7rLTyV6BQqpQunZ_tOK0uw_2xW2gdVWKUAFAO2M",
    },
  });
};

// Method for Updating a Link
const updateLink = (id, data) => {
  const uri = `${BASE_URL}/edit-link/${id}`;
  return axios.put(uri, data, {
    headers: {
      "Content-Type": "application/json",
      "ltree-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQyZjE5ZGJhNDIyN2NlYWM0MTNmNTIiLCJ1c2VybmFtZSI6InNhaXJhbSIsImVtYWlsIjoic2FpcmFtMTAwQGdtYWlsLmNvbSIsImlhdCI6MTcxMDk1NTc5NiwiZXhwIjoxNzExNTYwNTk2fQ.KWeRLqad0-SzAzP60RfnaXvXycxS4xV05r1CKRvgznU",
    },
  });
};

const result = {
  fetchAllLinks,
  addNewLink,
  deleteLink,
  updateLink,
};

export default result;
