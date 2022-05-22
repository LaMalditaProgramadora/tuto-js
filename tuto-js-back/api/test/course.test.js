import axios from "axios";

describe("User Tests", () => {
  const admin = {
    code: "admin",
    password: "1234",
  };

  const course = {
    code: "SX53",
    name: "Programamción I",
  };

  let courseSave = {};

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
      "http://localhost:3000/course/create",
      course,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
    courseSave = result.data.data;
  });

  it("Test Update - Actualización exitosa", async () => {
    courseSave.code = "SX54";
    courseSave.name = "Programamción III";
    const result = await axios.put(
      "http://localhost:3000/course/update",
      courseSave,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
    courseSave = result.data.data;
  });

  it("Test Update - Error en el servidor", async () => {
    const result = await axios.put(
      "http://localhost:3000/course/update",
      course,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test List All - Listado exitoso", async () => {
    const result = await axios.get("http://localhost:3000/course/listAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result.data.status).toEqual(1);
  });

  it("Test List Id - Listado exitoso", async () => {
    const result = await axios.get(
      `http://localhost:3000/course/listById?_id=${courseSave._id}`,
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
      `http://localhost:3000/course/listById?_id=1234`,
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
      `http://localhost:3000/course/remove?_id=${courseSave._id}`,
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
      `http://localhost:3000/course/remove?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });
});
