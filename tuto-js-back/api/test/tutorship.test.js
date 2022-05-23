import axios from "axios";

describe("Tutorship Tests", () => {
  const admin = {
    code: "admin",
    password: "1234",
  };

  const idCourse = "6289ba5409a3be1f17da4361";
  const idTeacher = "628b1fcd77af75c7f779f376";
  const idStudent = "628b235e2e630425875f541a";
  const idTutor = "628a573f58b845508ef9ffb3";
  const idSection = "628b338e6583eaab7a40f1df";
  const idTopic = "628b338e6583eaab7a40f1dd";

  const tutorship = {
    section: idSection,
    course: idCourse,
    tutor: idTutor,
    student: idStudent,
    topic: idTopic,
    reason: "Error de Spring Boot",
    registerDate: new Date(),
    attended: false,
    teacher: idTeacher,
  };

  let tutorshipSave = {};

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
      "http://localhost:3000/tutorship/create",
      tutorship,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
    tutorshipSave = result.data.data;
  });

  it("Test Update - Actualización exitosa", async () => {
    tutorshipSave.attendedDate = new Date();
    tutorshipSave.attended = true;
    tutorshipSave.solution = "Reiniciar";
    const result = await axios.put(
      "http://localhost:3000/tutorship/update",
      tutorshipSave,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
    tutorshipSave = result.data.data;
  });

  it("Test Update - Error en el servidor", async () => {
    const result = await axios.put(
      "http://localhost:3000/tutorship/update",
      tutorship,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test List All - Listado exitoso", async () => {
    const result = await axios.get("http://localhost:3000/tutorship/listAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result.data.status).toEqual(1);
  });

  it("Test List Id - Listado exitoso", async () => {
    const result = await axios.get(
      `http://localhost:3000/tutorship/listById?_id=${tutorshipSave._id}`,
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
      `http://localhost:3000/tutorship/listById?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test List by Teacher - Listado exitoso", async () => {
    const result = await axios.get(
      `http://localhost:3000/tutorship/listByTeacher?_id=${idTeacher}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test List by Teacher - Error en el servidor", async () => {
    const result = await axios.get(
      `http://localhost:3000/tutorship/listByTeacher?_id=1234`,
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
      `http://localhost:3000/tutorship/listByStudent?_id=${idStudent}`,
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
      `http://localhost:3000/tutorship/listByStudent?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });

  it("Test List by Tutor - Listado exitoso", async () => {
    const result = await axios.get(
      `http://localhost:3000/tutorship/listByTutor?_id=${idTutor}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(1);
  });

  it("Test List by Tutor - Error en el servidor", async () => {
    const result = await axios.get(
      `http://localhost:3000/tutorship/listByTutor?_id=1234`,
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
      `http://localhost:3000/tutorship/remove?_id=${tutorshipSave._id}`,
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
      `http://localhost:3000/tutorship/remove?_id=1234`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.data.status).toEqual(-1);
  });
});
