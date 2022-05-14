import httpClient from "../utils/httpClient";

export const resetPassword = async (type, loginDto) => {
  const data = await httpClient
    .post(`/${type}/resetPassword`, loginDto)
    .then((v) => v.data);
  return data;
};
