import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ListIcon from "@mui/icons-material/List";
import { tableIconStyle } from "./_styles";

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
      renderCell: (rows) => (
        <DeleteIcon
          sx={tableIconStyle}
          onClick={() => onClickDelete(rows)}
        ></DeleteIcon>
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

const courseColumns = [
  { field: "id", headerName: "#", flex: 0.125 },
  { field: "code", headerName: "Código", flex: 1 },
  { field: "name", headerName: "Nombre", flex: 2 },
];

const teacherColumns = [
  { field: "id", headerName: "#", flex: 0.125 },
  { field: "code", headerName: "Código", flex: 1 },
  { field: "fullName", headerName: "Nombre Completo", flex: 2 },
];

const tutorColumns = [
  { field: "id", headerName: "#", flex: 0.125 },
  { field: "code", headerName: "Código", flex: 1 },
  { field: "fullName", headerName: "Nombre Completo", flex: 2 },
];

const studentColumns = [
  { field: "id", headerName: "#", flex: 0.125 },
  { field: "code", headerName: "Código", flex: 1 },
  { field: "fullName", headerName: "Nombre Completo", flex: 2 },
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

export const getColumns = (route, onClickEdit, onClickDelete, onClickList) => {
  let columns = [];
  switch (route) {
    case "course":
      columns = courseColumns;
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
    case "tutor":
      columns = tutorColumns;
      break;
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
    default:
      break;
  }
  return columns;
};
