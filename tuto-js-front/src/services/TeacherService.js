import httpClient from "../utils/httpClient";
import { getToken } from "../utils/storage";

export const listAll = async () => {
  const data = await httpClient
    .get(`/teacher/listAll`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const create = async (teacherDto) => {
  const data = await httpClient
    .post(`/teacher/create`, teacherDto, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const update = async (teacherDto) => {
  const data = await httpClient
    .put(`/teacher/update`, teacherDto, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const remove = async (_id) => {
  const data = await httpClient
    .delete(`/teacher/remove?_id=${_id}`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};
