import Add from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { listStudents, removeStudent } from "../../services/SectionService";
import { getArrayWithId } from "../../utils/arrayHelper";
import DataTable from "../table/DataTable";
import { getListColumns } from "../table/_columns";
import SectionAddDialog from "./SectionAddDialog";

const SectionListDialog = ({ section, open, setOpen, setSnackbar }) => {
  const [rows, setRows] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const getStudentsFromApi = async () => {
    listStudents(section._id).then(
      (data) => {
        if (data && data.data) {
          setRows(getArrayWithId(data.data.students));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const removeStudentFromApi = ({ row }) => {
    removeStudent(section._id, row._id).then(
      (data) => {
        setSnackbar({
          open: true,
          message: data.message ? data.message : "Error en el mensaje",
        });
        if (data && data.status === 1) {
          getStudentsFromApi();
        }
      },
      (error) => {
        setSnackbar({ open: true, message: "Error en el servidor" });
        console.log(error);
      }
    );
  };

  useEffect(() => {
    if (section._id !== undefined) getStudentsFromApi(section._id);
  }, [section]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle>E s t u d i a n t e s</DialogTitle>
        <DialogContent>
          <SectionAddDialog
            idSection={section._id}
            open={openAdd}
            setOpen={setOpenAdd}
            reload={getStudentsFromApi}
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
          <DataTable rows={rows} columns={getListColumns("student", removeStudentFromApi)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SectionListDialog;
