import httpClient from "../utils/httpClient";

export const listAll = async () => {
  const data = await httpClient.get(`/student/listAll`).then((v) => v.data);
  return data;
};

export const listCourses = async (_id) => {
  const data = await httpClient
    .get(`/student/listCourses?_id=${_id}`)
    .then((v) => v.data);
  return data;
};

export const create = async (studentDto) => {
  const data = await httpClient
    .post(`/student/create`, studentDto)
    .then((v) => v.data);
  return data;
};

export const update = async (studentDto) => {
  const data = await httpClient
    .put(`/student/update`, studentDto)
    .then((v) => v.data);
  return data;
};

export const remove = async (_id) => {
  const data = await httpClient
    .delete(`/student/remove?_id=${_id}`)
    .then((v) => v.data);
  return data;
};
