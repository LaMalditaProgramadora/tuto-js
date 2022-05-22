import httpClient from "../utils/httpClient";
import { getToken } from "../utils/storage";

export const listAll = async () => {
  const data = await httpClient
    .get(`/tutor/listAll`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const listByCourse = async (_id) => {
  const data = await httpClient
    .get(`/tutor/listByCourse?_id=${_id}`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const create = async (tutorDto) => {
  const data = await httpClient
    .post(`/tutor/create`, tutorDto, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const update = async (tutorDto) => {
  const data = await httpClient
    .put(`/tutor/update`, tutorDto, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const remove = async (_id) => {
  const data = await httpClient
    .delete(`/tutor/remove?_id=${_id}`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};
