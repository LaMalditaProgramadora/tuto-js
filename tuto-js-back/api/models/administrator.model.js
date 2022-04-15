import mongoose from "mongoose";

const schemaAdministrator = {
  code: String,
  email: String,
  password: String,
  active: Boolean
};

const Administrator = mongoose.model(
  "Administrator",
  schemaAdministrator,
  "administrators"
);

export default Administrator;
