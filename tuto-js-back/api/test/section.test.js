import axios from "axios";

describe("Section Tests", () => {
  const admin = {
    code: "admin",
    password: "1234",
  };

  const idCourse = "6289ba5409a3be1f17da4361";
  const idTeacher = "628b1fcd77af75c7f779f376";
  const idStudent = "628b235e2e630425875f541a";

  const section = {
    code: "SX34",
    period: "2021-2",
    course: idCourse,
    teacher: idTeacher,
  };

  let sectionSave = {};

  let token;

  beforeAll(async () => {
    const login = await axios.post(
      "http://localhost:3000/administrator/login",
      admin
    );
    token = login.data.data.token;
  });

  it("Test Create - Registro exitoso", async () => {
    const result = await axios.post(
      "http://localhost:3000/section/create",
      section,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
    sectionSave = result.data.data;
  });

  it("Test Update - Actualización exitosa", async () => {
    sectionSave.period = "2023-1";
    const result = await axios.put(
      "http://localhost:3000/section/update",
      sectionSave,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
    sectionSave = result.data.data;
  });

  it("Test Update - Error en el servidor", async () => {
    const result = await axios.put(
      "http://localhost:3000/section/update",
      section,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test List All - Listado exitoso", async () => {
    const result = await axios.get("http://localhost:3000/section/listAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result.data.status).toEqual(1);
  });

  it("Test List Id - Listado exitoso", async () => {
    const result = await axios.get(
      `http://localhost:3000/section/listById?_id=${sectionSave._id}`,
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
      `http://localhost:3000/section/listById?_id=1234`,
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
      `http://localhost:3000/section/listByCourse?_id=${idCourse}`,
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
      `http://localhost:3000/section/listByCourse?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test List by Student - Listado exitoso", async () => {
    const result = await axios.get(
      `http://localhost:3000/section/listByStudent?_id=${idStudent}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test List by Student - Error en el servidor", async () => {
    const result = await axios.get(
      `http://localhost:3000/section/listByStudent?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test Add Student - Registro exitoso", async () => {
    const result = await axios.post(
      "http://localhost:3000/section/addStudent",
      {
        idStudent: idStudent,
        idSection: sectionSave._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test Add Student - Estudiante ya agregado", async () => {
    const result = await axios.post(
      "http://localhost:3000/section/addStudent",
      {
        idStudent: idStudent,
        idSection: sectionSave._id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(0);
  });

  it("Test List Students - Listado exitoso", async () => {
    const result = await axios.get(
      `http://localhost:3000/section/listStudents?_id=${sectionSave._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test List Students - Error en el servidor", async () => {
    const result = await axios.get(
      `http://localhost:3000/section/listStudents?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test Remove Student - Eliminación exitosa", async () => {
    const result = await axios.delete(
      `http://localhost:3000/section/removeStudent?idSection=${sectionSave._id}&idStudent=${idStudent}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test Remove Student - Error en el servidor", async () => {
    const result = await axios.delete(
        `http://localhost:3000/section/removeStudent?idSection=1234&idStudent=1234`,
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
      `http://localhost:3000/section/remove?_id=${sectionSave._id}`,
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
      `http://localhost:3000/section/remove?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });
});
