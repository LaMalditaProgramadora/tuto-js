import httpClient from "../utils/httpClient";

export const login = async (type, loginDto) => {
  const data = await httpClient
    .post(`/${type}/login`, loginDto)
    .then((v) => v.data);
  return data;
};
