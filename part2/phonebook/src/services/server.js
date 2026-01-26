import axios from "axios";
const baseUrl = '/api/persons';

const getAll = () => axios.get(baseUrl);
const createPerson = (newPerson) => axios.post(baseUrl, newPerson);
const updatePerson = (id, changedPerson) =>
  axios.put(`${baseUrl}/${id}`, changedPerson);
const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`);

export default {
  getAll,
  createPerson,
  updatePerson,
  deletePerson,
};
