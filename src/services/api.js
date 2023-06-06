import axios from "axios";

const BASEURL = "http://localhost:8080";

export const createTask = async (title, daily, endDate) => {
  const response = await axios.post(BASEURL + "/tasks", {
    title,
    daily,
    endDate: endDate.toISOString(),
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await axios.delete(BASEURL + "/tasks/" + id);
  return response.data;
};

export const getTasks = async () => {
  const res = await axios.get(BASEURL + "/tasks");
  return res.data;
};
