import httpClient from "../utils/httpClient";
import { getToken } from "../utils/storage";

export const listAll = async () => {
  const data = await httpClient
    .get(`/topic/listAll`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const listByCourse = async (_id) => {
  const data = await httpClient
    .get(`/topic/listByCourse?_id=${_id}`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const create = async (topicDto) => {
  const data = await httpClient
    .post(`/topic/create`, topicDto, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const update = async (topicDto) => {
  const data = await httpClient
    .put(`/topic/update`, topicDto, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const remove = async (_id) => {
  const data = await httpClient
    .delete(`/topic/remove?_id=${_id}`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};
