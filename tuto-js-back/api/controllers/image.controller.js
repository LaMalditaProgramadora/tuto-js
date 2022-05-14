
import { streamUpload } from "../utils/imageUploader.js";
import { createResponse } from "../utils/response.js";

export const uploadTutorshipImage = async (req, res) => {
  try {
    const result = await streamUpload(req);
    res.json(createResponse(1, "Imagen guardada", result));
  } catch(e) {
    console.log(e);
    res.json(createResponse(-1, "Error al guardar imagen", null));
  }
};
