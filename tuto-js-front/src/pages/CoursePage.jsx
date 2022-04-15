import Add from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CourseSaveDialog from "../components/dialog/CourseSaveDialog";
import DataTable from "../components/table/DataTable";
import { getColumns } from "../components/table/_columns";
import { listAll, remove } from "../services/CourseService";
import { getArrayWithId } from "../utils/arrayHelper";

const CoursePage = ({ setTitle, setSnackbar }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({ code: "", name: "" });
  const [open, setOpen] = useState(false);

  const setLocalTitle = () => {
    setTitle("Cursos");
  };

  const listAllFromApi = () => {
    listAll().then(
      (data) => {
        if (data && data.data) {
          setRows(getArrayWithId(data.data));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const removeFromApi = ({ row }) => {
    remove(row._id).then(
      (data) => {
        setSnackbar({
          open: true,
          message: data.message ? data.message : "Error en el mensaje",
        });
        if (data && data.status === 1) {
          listAllFromApi();
        }
      },
      (error) => {
        setSnackbar({ open: true, message: "Error en el servidor" });
        console.log(error);
      }
    );
  };

  const openEdit = ({ row }) => {
    setSelectedCourse(row);
    setOpen(true);
  };

  const openCreate = () => {
    setSelectedCourse({ code: "", name: "" });
    setOpen(true);
  };

  useEffect(() => {
    setLocalTitle();
    setColumns(getColumns("course", openEdit, removeFromApi));
    listAllFromApi();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <CourseSaveDialog
        course={selectedCourse}
        open={open}
        setOpen={setOpen}
        reload={listAllFromApi}
        setSnackbar={setSnackbar}
      />
      <Button variant="contained" sx={{ mb: 2 }} onClick={openCreate}>
        <Add />
        <Typography sx={{ mr: 1 }}>Agregar</Typography>
      </Button>
      <DataTable rows={rows} columns={columns} />
    </div>
  );
};

export default CoursePage;
