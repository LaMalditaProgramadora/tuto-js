import httpClient from "../utils/httpClient";

export const listAll = async () => {
  const data = await httpClient.get(`/course/listAll`).then((v) => v.data);
  return data;
};

export const listCourses = async (_id) => {
  const data = await httpClient
    .get(`/course/listCourses?_id=${_id}`)
    .then((v) => v.data);
  return data;
};

export const create = async (courseDto) => {
  const data = await httpClient
    .post(`/course/create`, courseDto)
    .then((v) => v.data);
  return data;
};

export const update = async (courseDto) => {
  const data = await httpClient
    .put(`/course/update`, courseDto)
    .then((v) => v.data);
  return data;
};

export const remove = async (_id) => {
  const data = await httpClient
    .delete(`/course/remove?_id=${_id}`)
    .then((v) => v.data);
  return data;
};

export const addTutor = async (courseDto) => {
  const data = await httpClient
    .post(`/course/addTutor`, courseDto)
    .then((v) => v.data);
  return data;
};

export const listTutors = async (_id) => {
  const data = await httpClient
    .get(`/course/listTutors?_id=${_id}`)
    .then((v) => v.data);
  return data;
};

export const removeTutor = async (idCourse, idTutor) => {
  const data = await httpClient
    .delete(`/course/removeTutor?idCourse=${idCourse}&idTutor=${idTutor}`)
    .then((v) => v.data);
  return data;
};
