import axios from "axios";

describe("Topic Tests", () => {
  const admin = {
    code: "admin",
    password: "1234",
  };

  const topic = {
    description: "Spring Boot",
    course: "6289ba5409a3be1f17da4361",
  };

  let topicSave = {};
  const idCourse = "6289ba5409a3be1f17da4361";
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
      "http://localhost:3000/topic/create",
      topic,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
    topicSave = result.data.data;
  });

  it("Test Update - Actualización exitosa", async () => {
    topicSave.description = "Spring Boot Update";
    const result = await axios.put(
      "http://localhost:3000/topic/update",
      topicSave,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
    topicSave = result.data.data;
  });

  it("Test Update - Error en el servidor", async () => {
    const result = await axios.put(
      "http://localhost:3000/topic/update",
      topic,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test List All - Listado exitoso", async () => {
    const result = await axios.get("http://localhost:3000/topic/listAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result.data.status).toEqual(1);
  });

  it("Test List Id - Listado exitoso", async () => {
    const result = await axios.get(
      `http://localhost:3000/topic/listById?_id=${topicSave._id}`,
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
      `http://localhost:3000/topic/listById?_id=1234`,
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
      `http://localhost:3000/topic/listByCourse?_id=${idCourse}`,
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
      `http://localhost:3000/topic/listByCourse?_id=1234`,
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
      `http://localhost:3000/topic/remove?_id=${topicSave._id}`,
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
      `http://localhost:3000/topic/remove?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });
});
