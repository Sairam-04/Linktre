import axios from "axios";
import { getUser } from "../../utils/localStorage";
import { BACKEND_URL } from "../../constants/urls";
const BASE_URL = BACKEND_URL;

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
      "ltree-token": getUser(),
    },
  });
};

// Method for Deleting a Link
const deleteLink = (id) => {
  const uri = `${BASE_URL}/delete-link/${id}`;
  return axios.delete(uri, {
    headers: {
      "Content-Type": "application/json",
      "ltree-token": getUser(),
    },
  });
};

// Method for Updating a Link
const updateLink = (id, data) => {
  const uri = `${BASE_URL}/edit-link/${id}`;
  return axios.put(uri, data, {
    headers: {
      "Content-Type": "application/json",
      "ltree-token": getUser(),
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
