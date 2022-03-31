import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { tableIconStyle } from "./_styles";

const getActionColumns = (onClickEdit, onClickDelete) => {
  return [
    {
      field: "edit",
      headerName: "Editar",
      flex: 0.5,
      filterable: false,
      sortable: false,
      renderCell: (rows) => (
        <Edit
          sx={tableIconStyle}
          onClick={() => onClickEdit(rows)}
        ></Edit>
      ),
    },
    {
      field: "delete",
      headerName: "Eliminar",
      flex: 0.5,
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
  { field: "id", headerName: "#", flex: 0.5 },
  { field: "code", headerName: "Código", flex: 1 },
  { field: "name", headerName: "Nombre", flex: 2 },
];

export const getColumns = (route, onClickEdit, onClickDelete) => {
  let columns = [];
  switch (route) {
    case "course":
      columns = courseColumns;
      break;
    default:
      break;
  }
  return columns.concat(getActionColumns(onClickEdit, onClickDelete));
};
