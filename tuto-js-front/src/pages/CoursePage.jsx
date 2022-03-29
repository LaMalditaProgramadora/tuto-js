import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DataTable from "../components/table/DataTable";
import Add from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { listAll } from "../services/CourseService";
import { tableIconStyle } from "../styles";

const CoursePage = ({ setTitle }) => {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "id", headerName: "#", flex: 0.5 },
    { field: "code", headerName: "Código", flex: 1 },
    { field: "name", headerName: "Nombre", flex: 2 },
    {
      field: "edit",
      headerName: "Editar",
      flex: 0.5,
      renderCell: () => <Edit sx={tableIconStyle}></Edit>,
    },
    {
      field: "delete",
      headerName: "Eliminar",
      flex: 0.5,
      renderCell: () => <Delete sx={tableIconStyle}></Delete>,
    },
  ];

  const setLocalTitle = () => {
    setTitle("Cursos");
  };

  const listAllFromApi = () => {
    listAll().then((data) => {
      if (data.data) {
        let rowsAux = data.data;
        rowsAux.forEach((row, index) => {
          row.id = index + 1;
        });
        setRows(rowsAux);
      }
    });
  };

  useEffect(() => {
    setLocalTitle();
    listAllFromApi();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Button variant="contained" sx={{ mb: 2 }}>
        <Add />
        <Typography sx={{ mr: 1 }}>Agregar</Typography>
      </Button>
      <DataTable rows={rows} columns={columns} />
    </div>
  );
};

export default CoursePage;
