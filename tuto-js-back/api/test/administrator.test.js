import axios from "axios";

describe("User Tests", () => {

  const changePasswordUser = {
    code: "admin5",
    password: "1234",
  };

  const activeUser = {
    code: "admin",
    password: "1234",
  };

  const inactiveUser = {
    code: "admin2",
    password: "1234",
  };

  const incorrectCodeUser = {
    code: "admin1",
    password: "1234",
  };

  const incorrectPasswordUser = {
    code: "admin",
    password: "12345",
  };

  it("Test Login - No activo", async () => {
    const result = await axios.post(
      "http://localhost:3000/administrator/login",
      inactiveUser
    );
    expect(result.data.status).toEqual(0);
  });

  it("Test Login - Exitoso", async () => {
    const result = await axios.post(
      "http://localhost:3000/administrator/login",
      activeUser
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test Login - Código Incorrecto", async () => {
    const result = await axios.post(
      "http://localhost:3000/administrator/login",
      incorrectCodeUser
    );
    expect(result.data.status).toEqual(0);
  });

  it("Test Login - Contraseña Incorrecta", async () => {
    const result = await axios.post(
      "http://localhost:3000/administrator/login",
      incorrectPasswordUser
    );
    expect(result.data.status).toEqual(0);
  });

  it("Test Reset Password - No encontrado", async () => {
    const result = await axios.post(
      "http://localhost:3000/administrator/resetPassword",
      { code: incorrectCodeUser.code }
    );
    expect(result.data.status).toEqual(0);
  });

  it("Test Reset Password - Exitoso", async () => {
    const result = await axios.post(
      "http://localhost:3000/administrator/resetPassword",
      { code: changePasswordUser.code }
    );
    expect(result.data.status).toEqual(1);
  });
});
