import httpClient from "../utils/httpClient";
import { getUser, getToken } from "../utils/storage";

export const listAll = async () => {
  let listType = "listAll";
  const user = getUser();
  console.log(user.type);
  console.log(user._id);
  switch (user.type) {
    case "student":
      listType = `listByStudent?_id=${user._id}`;
      break;
    case "tutor":
      listType = `listByTutor?_id=${user._id}`;
      break;
    case "teacher":
      listType = `listByTeacher?_id=${user._id}`;
      break;
    case "administrator":
      listType = `listAll`;
      break;
    default:
      break;
  }

  const data = await httpClient
    .get(`/tutorship/${listType}`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const create = async (tutorshipDto) => {
  const data = await httpClient
    .post(`/tutorship/create`, tutorshipDto, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const update = async (tutorshipDto) => {
  const data = await httpClient
    .put(`/tutorship/update`, tutorshipDto, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const remove = async (_id) => {
  const data = await httpClient
    .delete(`/tutorship/remove?_id=${_id}`, {
      headers: {
        Authorization: getToken(),
      },
    })
    .then((v) => v.data);
  return data;
};

export const uploadImage = async (file) => {
  let formData = new FormData();
  formData.append("image", file);
  const data = await httpClient
    .post("/tutorship/uploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((v) => v.data);
  return data;
};
