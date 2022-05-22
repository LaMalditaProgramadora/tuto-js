import httpClient from "../utils/httpClient";
import { getToken } from "../utils/storage";

export const listAll = async () => {
  const data = await httpClient
    .get(`/section/listAll`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const listByCourse = async (_id) => {
  const data = await httpClient
    .get(`/section/listByCourse?_id=${_id}`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const listByStudent = async (_id) => {
  const data = await httpClient
    .get(`/section/listByStudent?_id=${_id}`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const create = async (sectionDto) => {
  const data = await httpClient
    .post(`/section/create`, sectionDto, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const update = async (sectionDto) => {
  const data = await httpClient
    .put(`/section/update`, sectionDto, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const remove = async (_id) => {
  const data = await httpClient
    .delete(`/section/remove?_id=${_id}`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const addStudent = async (sectionDto) => {
  const data = await httpClient
    .post(`/section/addStudent`, sectionDto, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const listStudents = async (_id) => {
  const data = await httpClient
    .get(`/section/listStudents?_id=${_id}`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const removeStudent = async (idSection, idStudent) => {
  const data = await httpClient
    .delete(
      `/section/removeStudent?idSection=${idSection}&idStudent=${idStudent},`,
      {
        headers: {
          Authorization: getToken(),
        },
      }
    )
    .then((v) => v.data);
  return data;
};
