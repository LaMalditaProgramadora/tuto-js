import httpClient from "../utils/httpClient";

export const listAll = async (id) => {
  const data = await httpClient
    .get(`/course/listAll`)
    .then((v) => v.data);
  return data;
};
