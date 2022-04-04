import httpClient from "../utils/httpClient";

export const listAll = async () => {
  const data = await httpClient
    .get(`/section/listAll`)
    .then((v) => v.data);
  return data;
};

export const create = async (sectionDto) => {
  const data = await httpClient
    .post(`/section/create`, sectionDto)
    .then((v) => v.data);
  return data;
};

export const update = async (sectionDto) => {
  const data = await httpClient
    .put(`/section/update`, sectionDto)
    .then((v) => v.data);
  return data;
};

export const remove = async (_id) => {
  const data = await httpClient
    .delete(`/section/remove?_id=${_id}`)
    .then((v) => v.data);
  return data;
};