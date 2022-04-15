import httpClient from "../utils/httpClient";

export const listAll = async () => {
  const data = await httpClient
    .get(`/tutor/listAll`)
    .then((v) => v.data);
  return data;
};

export const create = async (tutorDto) => {
  const data = await httpClient
    .post(`/tutor/create`, tutorDto)
    .then((v) => v.data);
  return data;
};

export const update = async (tutorDto) => {
  const data = await httpClient
    .put(`/tutor/update`, tutorDto)
    .then((v) => v.data);
  return data;
};

export const remove = async (_id) => {
  const data = await httpClient
    .delete(`/tutor/remove?_id=${_id}`)
    .then((v) => v.data);
  return data;
};