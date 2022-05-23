import axios from "axios";

describe("Student Tests", () => {
  const admin = {
    code: "admin",
    password: "1234",
  };

  const student = {
    code: "student3",
    fullName: "Flavia Ruiz",
    password: "1234",
    email: "flavia@gmail.com",
  };

  let studentSave = {};
  let token;

  const changePasswordUser = {
    code: "student2",
    password: "1234",
  };

  const activeUser = {
    code: "student1",
    password: "1234",
  };

  const incorrectCodeUser = {
    code: "student4",
    password: "1234",
  };

  const incorrectPasswordUser = {
    code: "student1",
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
      "http://localhost:3000/student/login",
      activeUser
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test Login - Código Incorrecto", async () => {
    const result = await axios.post(
      "http://localhost:3000/student/login",
      incorrectCodeUser
    );
    expect(result.data.status).toEqual(0);
  });

  it("Test Login - Contraseña Incorrecta", async () => {
    const result = await axios.post(
      "http://localhost:3000/student/login",
      incorrectPasswordUser
    );
    expect(result.data.status).toEqual(0);
  });

  it("Test Reset Password - No encontrado", async () => {
    const result = await axios.post(
      "http://localhost:3000/student/resetPassword",
      { code: incorrectCodeUser.code }
    );
    expect(result.data.status).toEqual(0);
  });

  it("Test Reset Password - Exitoso", async () => {
    const result = await axios.post(
      "http://localhost:3000/student/resetPassword",
      { code: changePasswordUser.code }
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test Create - Registro exitoso", async () => {
    const result = await axios.post(
      "http://localhost:3000/student/create",
      student,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
    studentSave = result.data.data;
  });

  it("Test Update - Actualización exitosa", async () => {
    studentSave.fullName = "Flavia Ruiz update";
    const result = await axios.put(
      "http://localhost:3000/student/update",
      studentSave,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
    studentSave = result.data.data;
  });

  it("Test Update - Error en el servidor", async () => {
    const result = await axios.put(
      "http://localhost:3000/student/update",
      student,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test List All - Listado exitoso", async () => {
    const result = await axios.get("http://localhost:3000/student/listAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result.data.status).toEqual(1);
  });

  it("Test List Id - Listado exitoso", async () => {
    const result = await axios.get(
      `http://localhost:3000/student/listById?_id=${studentSave._id}`,
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
      `http://localhost:3000/student/listById?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test List Courses - Listado exitoso", async () => {
    const result = await axios.get(
      `http://localhost:3000/student/listCourses?_id=${studentSave._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test List Courses - Error en el servidor", async () => {
    const result = await axios.get(
      `http://localhost:3000/student/listCourses?_id=1234`,
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
      `http://localhost:3000/student/remove?_id=${studentSave._id}`,
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
      `http://localhost:3000/student/remove?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });
});
