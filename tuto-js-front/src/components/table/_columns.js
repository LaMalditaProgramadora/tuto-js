import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ListIcon from "@mui/icons-material/List";
import { tableIconStyle } from "./_styles";
import { getUser } from "../../utils/storage";

const getActionColumns = (onClickEdit, onClickDelete) => {
  return [
    {
      field: "edit",
      headerName: "Editar",
      flex: 0.25,
      filterable: false,
      sortable: false,
      renderCell: (rows) => (
        <EditIcon
          sx={tableIconStyle}
          onClick={() => onClickEdit(rows)}
        ></EditIcon>
      ),
    },
    {
      field: "delete",
      headerName: "Eliminar",
      flex: 0.25,
      filterable: false,
      sortable: false,
      renderCell: (rows) => (
        <DeleteIcon
          sx={tableIconStyle}
          onClick={() => onClickDelete(rows)}
        ></DeleteIcon>
      ),
    },
  ];
};

const getDeleteColumn = (onClickDelete) => {
  return [
    {
      field: "delete",
      headerName: "Eliminar",
      flex: 0.25,
      filterable: false,
      sortable: false,
      renderCell: (row) => (
        <DeleteIcon
          sx={tableIconStyle}
          onClick={() => onClickDelete(row)}
        ></DeleteIcon>
      ),
    },
  ];
};

const getEditColumn = (onClickEdit) => {
  return [
    {
      field: "edit",
      headerName: "Editar",
      flex: 0.25,
      filterable: false,
      sortable: false,
      renderCell: (row) => (
        <EditIcon
          sx={tableIconStyle}
          onClick={() => onClickEdit(row)}
        ></EditIcon>
      ),
    },
  ];
};

const getDetailColumn = (onClickDetail) => {
  return [
    {
      field: "detail",
      headerName: "Detalle",
      flex: 0.25,
      filterable: false,
      sortable: false,
      renderCell: (row) => (
        <ListIcon
          sx={tableIconStyle}
          onClick={() => onClickDetail(row)}
        ></ListIcon>
      ),
    },
  ];
};

const getListColumn = (onClickList, listTitle) => {
  return [
    {
      field: "list",
      headerName: listTitle,
      flex: 0.25,
      filterable: false,
      sortable: false,
      renderCell: (rows) => (
        <ListIcon
          sx={tableIconStyle}
          onClick={() => onClickList(rows)}
        ></ListIcon>
      ),
    },
  ];
};

const topicColumns = [
  { field: "id", headerName: "#", flex: 0.125 },
  { field: "description", headerName: "Descripción", flex: 2 },
  { field: "courseCode", headerName: "Curso", flex: 1 },
];

const courseColumns = [
  { field: "id", headerName: "#", flex: 0.125 },
  { field: "code", headerName: "Código", flex: 1 },
  { field: "name", headerName: "Nombre", flex: 2 },
];

const teacherColumns = [
  { field: "id", headerName: "#", flex: 0.125 },
  { field: "code", headerName: "Código", flex: 0.5 },
  { field: "fullName", headerName: "Nombre Completo", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
];

const tutorColumns = [
  { field: "id", headerName: "#", flex: 0.125 },
  { field: "code", headerName: "Código", flex: 0.5 },
  { field: "fullName", headerName: "Nombre Completo", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
];

const studentColumns = [
  { field: "id", headerName: "#", flex: 0.125 },
  { field: "code", headerName: "Código", flex: 0.5 },
  { field: "fullName", headerName: "Nombre Completo", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
];

const sectionColumns = [
  { field: "id", headerName: "#", flex: 0.125 },
  { field: "code", headerName: "Código", flex: 0.25 },
  { field: "period", headerName: "Periodo", flex: 0.25 },
  {
    field: "courseCode",
    headerName: "Curso",
    flex: 0.5,
  },
  {
    field: "teacherCode",
    headerName: "Profesor",
    flex: 0.5,
  },
];

const tutorshipColumns = [
  { field: "id", headerName: "#", flex: 0.125 },
  { field: "registerDate", headerName: "Fecha", flex: 0.4 },
  { field: "attended", headerName: "Atendido", flex: 0.25 },
  {
    field: "courseCode",
    headerName: "Curso",
    flex: 0.5,
  },
  {
    field: "sectionCode",
    headerName: "Sección",
    flex: 0.25,
  },
  {
    field: "tutorCode",
    headerName: "Tutor",
    flex: 0.5,
  },
  {
    field: "studentCode",
    headerName: "Estudiante",
    flex: 0.5,
  },
  {
    field: "topicDescription",
    headerName: "Tema",
    flex: 0.5,
  },
];

const tutorshipColumnsToTutor = [
  { field: "id", headerName: "#", flex: 0.125 },
  { field: "registerDate", headerName: "Fecha", flex: 0.4 },
  { field: "attended", headerName: "Atendido", flex: 0.25 },
  {
    field: "courseCode",
    headerName: "Curso",
    flex: 0.5,
  },
  {
    field: "sectionCode",
    headerName: "Sección",
    flex: 0.25,
  },
  {
    field: "studentCode",
    headerName: "Estudiante",
    flex: 0.5,
  },
  {
    field: "topicDescription",
    headerName: "Tema",
    flex: 0.5,
  },
];

const tutorshipColumnsToStudent = [
  { field: "id", headerName: "#", flex: 0.125 },
  { field: "registerDate", headerName: "Fecha", flex: 0.4 },
  { field: "attended", headerName: "Atendido", flex: 0.25 },
  {
    field: "courseCode",
    headerName: "Curso",
    flex: 0.5,
  },
  {
    field: "tutorCode",
    headerName: "Tutor",
    flex: 0.5,
  },
  {
    field: "topicDescription",
    headerName: "Tema",
    flex: 0.5,
  },
];

export const getColumns = (route, onClickEdit, onClickDelete, onClickList, onClickDetail) => {
  let columns = [];
  switch (route) {
    case "course":
      columns = courseColumns.concat(getListColumn(onClickList, "Tutores"));
      break;
    case "teacher":
      columns = teacherColumns;
      break;
    case "section":
      columns = sectionColumns.concat(
        getListColumn(onClickList, "Estudiantes")
      );
      break;
    case "student":
      columns = studentColumns;
      break;
    case "tutor":
      columns = tutorColumns;
      break;
    case "topic":
      columns = topicColumns;
      break;
    case "tutorship":
      if (getUser().type === "student") {
        columns = tutorshipColumnsToStudent;
        return columns.concat(getDeleteColumn(onClickDelete));
      } else if (getUser().type === "tutor") {
        columns = tutorshipColumnsToTutor;
        return columns.concat(getEditColumn(onClickEdit));
      } else {
        columns = tutorshipColumns.concat(getDetailColumn(onClickDetail));
        return columns;
      }
    default:
      break;
  }
  return columns.concat(getActionColumns(onClickEdit, onClickDelete));
};

export const getListColumns = (route, onClickDelete) => {
  let columns = [];
  switch (route) {
    case "student":
      columns = studentColumns.concat(getDeleteColumn(onClickDelete));
      break;
    case "tutor":
      columns = tutorColumns.concat(getDeleteColumn(onClickDelete));
      break;
    default:
      break;
  }
  return columns;
};
