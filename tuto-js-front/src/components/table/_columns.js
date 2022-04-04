import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
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
        <Edit sx={tableIconStyle} onClick={() => onClickEdit(rows)}></Edit>
      ),
    },
    {
      field: "delete",
      headerName: "Eliminar",
      flex: 0.25,
      filterable: false,
      sortable: false,
      renderCell: (rows) => (
        <Delete
          sx={tableIconStyle}
          onClick={() => onClickDelete(rows)}
        ></Delete>
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

export const getColumns = (route, onClickEdit, onClickDelete) => {
  let columns = [];
  switch (route) {
    case "course":
      columns = courseColumns;
      break;
    case "teacher":
      columns = teacherColumns;
      break;
    case "section":
      columns = sectionColumns;
      break;
    case "student":
      columns = studentColumns;
      break;
    default:
      break;
  }
  return columns.concat(getActionColumns(onClickEdit, onClickDelete));
};
