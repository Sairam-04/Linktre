import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URI;

const ALL_LINKS_URL = (username) => `get-all-links/${username}`;

// Method for Fetching All the Links
const fetchAllLinks = (username) => {
  const uri = `${BASE_URL}/${ALL_LINKS_URL(username)}`;
  return axios.get(uri, { params: { username: username } });
};

// Method for Adding Link
const addNewLink = (data) => {
  const uri = `${BASE_URL}/add-link`;
  return axios.post(uri, data, {
    headers: {
      "Content-Type": "application/json",
      "ltree-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQyZjE5ZGJhNDIyN2NlYWM0MTNmNTIiLCJ1c2VybmFtZSI6InNhaXJhbSIsImVtYWlsIjoic2FpcmFtMTAwQGdtYWlsLmNvbSIsImlhdCI6MTcxMDY3MDM0MywiZXhwIjoxNzExMjc1MTQzfQ.RdTX5PsI17yGZjM12tWT4Z4JbYzdeQ_4U9s7ObubKwo",
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

const result = {
  fetchAllLinks,
  addNewLink,
  deleteLink
};

export default result;
