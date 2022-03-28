import ModelTraining from "@mui/icons-material/ModelTraining";
import Person from "@mui/icons-material/Person";
import BorderColor from "@mui/icons-material/BorderColor";
import Group from "@mui/icons-material/Group";
import School from "@mui/icons-material/School";
import EventNote from "@mui/icons-material/EventNote";
import CalendarViewDay from "@mui/icons-material/CalendarViewDay";

export const categories = [
  {
    id: "Atenciones",
    children: [{ id: "Tutorías", icon: <ModelTraining />, route: "tutorship" }],
  },
  {
    id: "Gestión Currículo",
    children: [
      { id: "Cursos", icon: <EventNote />, route: "course" },
      { id: "Secciones", icon: <CalendarViewDay />, route: "section" },
      { id: "Temas", icon: <BorderColor />, route: "topic" },
    ],
  },
  {
    id: "Gestión Participantes",
    children: [
      { id: "Profesores", icon: <School />, route: "teacher" },
      { id: "Tutores", icon: <Person />, route: "tutor" },
      { id: "Estudiantes", icon: <Group />, route: "student" },
    ],
  },
];
