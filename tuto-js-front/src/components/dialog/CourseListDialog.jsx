import Add from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { listTutors, removeTutor } from "../../services/CourseService";
import { getArrayWithId } from "../../utils/arrayHelper";
import DataTable from "../table/DataTable";
import { getListColumns } from "../table/_columns";
import CourseAddDialog from "./CourseAddDialog";

const CourseListDialog = ({ course, open, setOpen, setSnackbar }) => {
  const [rows, setRows] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const getTutorsFromApi = async () => {
    listTutors(course._id).then(
      (data) => {
        if (data && data.data) {
          setRows(getArrayWithId(data.data.tutors));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const removeTutorFromApi = ({ row }) => {
    removeTutor(course._id, row._id).then(
      (data) => {
        setSnackbar({
          open: true,
          message: data.message ? data.message : "Error en el mensaje",
        });
        if (data && data.status === 1) {
          getTutorsFromApi();
        }
      },
      (error) => {
        setSnackbar({ open: true, message: "Error en el servidor" });
        console.log(error);
      }
    );
  };

  useEffect(() => {
    if (course._id !== undefined) getTutorsFromApi(course._id);
  }, [course]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle>T u t o r e s</DialogTitle>
        <DialogContent>
          <CourseAddDialog
            idCourse={course._id}
            open={openAdd}
            setOpen={setOpenAdd}
            reload={getTutorsFromApi}
            setSnackbar={setSnackbar}
          />
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => {
              setOpenAdd(true);
            }}
          >
            <Add />
            <Typography sx={{ mr: 1 }}>Agregar</Typography>
          </Button>
          <DataTable
            rows={rows}
            columns={getListColumns("tutor", removeTutorFromApi)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseListDialog;
