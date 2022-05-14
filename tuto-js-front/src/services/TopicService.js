import httpClient from "../utils/httpClient";

export const listAll = async () => {
  const data = await httpClient.get(`/topic/listAll`).then((v) => v.data);
  return data;
};

export const listByCourse = async (_id) => {
  const data = await httpClient
    .get(`/topic/listByCourse?_id=${_id}`)
    .then((v) => v.data);
  return data;
};

export const create = async (topicDto) => {
  const data = await httpClient
    .post(`/topic/create`, topicDto)
    .then((v) => v.data);
  return data;
};

export const update = async (topicDto) => {
  const data = await httpClient
    .put(`/topic/update`, topicDto)
    .then((v) => v.data);
  return data;
};

export const remove = async (_id) => {
  const data = await httpClient
    .delete(`/topic/remove?_id=${_id}`)
    .then((v) => v.data);
  return data;
};
