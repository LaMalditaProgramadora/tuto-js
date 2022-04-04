import httpClient from "../utils/httpClient";

export const listAll = async () => {
  const data = await httpClient
    .get(`/teacher/listAll`)
    .then((v) => v.data);
  return data;
};

export const create = async (teacherDto) => {
  const data = await httpClient
    .post(`/teacher/create`, teacherDto)
    .then((v) => v.data);
  return data;
};

export const update = async (teacherDto) => {
  const data = await httpClient
    .put(`/teacher/update`, teacherDto)
    .then((v) => v.data);
  return data;
};

export const remove = async (_id) => {
  const data = await httpClient
    .delete(`/teacher/remove?_id=${_id}`)
    .then((v) => v.data);
  return data;
};