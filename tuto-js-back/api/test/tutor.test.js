import axios from "axios";

describe("Tutor Tests", () => {
  const admin = {
    code: "admin",
    password: "1234",
  };

  const tutor = {
    code: "tcsijiru5",
    fullName: "Jimena Ruiz Cerna",
    password: "1234",
    email: "jyellow365@gmail.com",
  };

  let tutorSave = {};
  const idCourse = "6289ba5409a3be1f17da4361";
  let token;

  const changePasswordUser = {
    code: "tcsijiru2",
    password: "1234",
  };

  const activeUser = {
    code: "tcsijiru",
    password: "1234",
  };

  const incorrectCodeUser = {
    code: "tcsijiru3",
    password: "1234",
  };

  const incorrectPasswordUser = {
    code: "tcsijiru",
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
      "http://localhost:3000/tutor/login",
      activeUser
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test Login - Código Incorrecto", async () => {
    const result = await axios.post(
      "http://localhost:3000/tutor/login",
      incorrectCodeUser
    );
    expect(result.data.status).toEqual(0);
  });

  it("Test Login - Contraseña Incorrecta", async () => {
    const result = await axios.post(
      "http://localhost:3000/tutor/login",
      incorrectPasswordUser
    );
    expect(result.data.status).toEqual(0);
  });

  it("Test Reset Password - No encontrado", async () => {
    const result = await axios.post(
      "http://localhost:3000/tutor/resetPassword",
      { code: incorrectCodeUser.code }
    );
    expect(result.data.status).toEqual(0);
  });

  it("Test Reset Password - Exitoso", async () => {
    const result = await axios.post(
      "http://localhost:3000/tutor/resetPassword",
      { code: changePasswordUser.code }
    );
    expect(result.data.status).toEqual(1);
  });

  //gefhwebfhebkfnjekwnfkjnfjkwenfjeknjknfjwnjekjfwnejfekw

  it("Test Create - Registro exitoso", async () => {
    const result = await axios.post(
      "http://localhost:3000/tutor/create",
      tutor,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
    tutorSave = result.data.data;
  });

  it("Test Update - Actualización exitosa", async () => {
    tutorSave.fullName = "Jimena Ruiz Cerna update";
    const result = await axios.put(
      "http://localhost:3000/tutor/update",
      tutorSave,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
    tutorSave = result.data.data;
  });

  it("Test Update - Error en el servidor", async () => {
    const result = await axios.put(
      "http://localhost:3000/tutor/update",
      tutor,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test List All - Listado exitoso", async () => {
    const result = await axios.get("http://localhost:3000/tutor/listAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result.data.status).toEqual(1);
  });

  it("Test List Id - Listado exitoso", async () => {
    const result = await axios.get(
      `http://localhost:3000/tutor/listById?_id=${tutorSave._id}`,
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
      `http://localhost:3000/tutor/listById?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test List by Course - Listado exitoso", async () => {
    const result = await axios.get(
      `http://localhost:3000/tutor/listByCourse?_id=${idCourse}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test List by Course - Error en el servidor", async () => {
    const result = await axios.get(
      `http://localhost:3000/tutor/listByCourse?_id=1234`,
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
      `http://localhost:3000/tutor/remove?_id=${tutorSave._id}`,
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
      `http://localhost:3000/tutor/remove?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });
});
