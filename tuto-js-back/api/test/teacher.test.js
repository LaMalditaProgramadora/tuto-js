import axios from "axios";

describe("Teacher Tests", () => {
  const admin = {
    code: "admin",
    password: "1234",
  };

  const teacher = {
    code: "profe3",
    fullName: "Rosa Cobeñas",
    password: "1234",
    email: "rosacob@gmail.com",
  };

  let teacherSave = {};
  let token;

  const changePasswordUser = {
    code: "profe2",
    password: "1234",
  };

  const activeUser = {
    code: "profe1",
    password: "1234",
  };

  const incorrectCodeUser = {
    code: "profe4",
    password: "1234",
  };

  const incorrectPasswordUser = {
    code: "profe1",
    password: "12345",
  };

  beforeAll(async () => {
    const login = await axios.post(
      "http://localhost:3000/administrator/login",
      admin
    );
    token = login.data.data.token;
  });

  it("Test Login - Exitoso", async () => {
    const result = await axios.post(
      "http://localhost:3000/teacher/login",
      activeUser
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test Login - Código Incorrecto", async () => {
    const result = await axios.post(
      "http://localhost:3000/teacher/login",
      incorrectCodeUser
    );
    expect(result.data.status).toEqual(0);
  });

  it("Test Login - Contraseña Incorrecta", async () => {
    const result = await axios.post(
      "http://localhost:3000/teacher/login",
      incorrectPasswordUser
    );
    expect(result.data.status).toEqual(0);
  });

  it("Test Reset Password - No encontrado", async () => {
    const result = await axios.post(
      "http://localhost:3000/teacher/resetPassword",
      { code: incorrectCodeUser.code }
    );
    expect(result.data.status).toEqual(0);
  });

  it("Test Reset Password - Exitoso", async () => {
    const result = await axios.post(
      "http://localhost:3000/teacher/resetPassword",
      { code: changePasswordUser.code }
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test Create - Registro exitoso", async () => {
    const result = await axios.post(
      "http://localhost:3000/teacher/create",
      teacher,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
    teacherSave = result.data.data;
  });

  it("Test Update - Actualización exitosa", async () => {
    teacherSave.fullName = "Rosa Cobeñas update";
    const result = await axios.put(
      "http://localhost:3000/teacher/update",
      teacherSave,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
    teacherSave = result.data.data;
  });

  it("Test Update - Error en el servidor", async () => {
    const result = await axios.put(
      "http://localhost:3000/teacher/update",
      teacher,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test List All - Listado exitoso", async () => {
    const result = await axios.get("http://localhost:3000/teacher/listAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result.data.status).toEqual(1);
  });

  it("Test List Id - Listado exitoso", async () => {
    const result = await axios.get(
      `http://localhost:3000/teacher/listById?_id=${teacherSave._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test List Id - Error en el servidor", async () => {
    const result = await axios.get(
      `http://localhost:3000/teacher/listById?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test Remove - Eliminación exitosa", async () => {
    const result = await axios.delete(
      `http://localhost:3000/teacher/remove?_id=${teacherSave._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test Remove - Error en el servidor", async () => {
    const result = await axios.delete(
      `http://localhost:3000/teacher/remove?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });
});
