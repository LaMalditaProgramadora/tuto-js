import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { create, update } from "../../services/TeacherService";

const TeacherSaveDialog = ({ teacher, open, setOpen, reload, setSnackbar }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const teacherDto = {
      code: formData.get("code"),
      fullName: formData.get("fullName"),
    };
    if (teacher._id) {
      teacherDto._id = teacher._id;
      update(teacherDto).then(
        (data) => {
          setIsLoading(false);
          setSnackbar({
            open: true,
            message: data.message ? data.message : "Error en el mensaje",
          });
          if (data && data.status === 1) {
            reload();
            setOpen(false);
          }
        },
        (error) => {
          setSnackbar({ open: true, message: "Error en el servidor" });
          setIsLoading(false);
        }
      );
    } else {
      create(teacherDto).then(
        (data) => {
          setIsLoading(false);
          setSnackbar({
            open: true,
            message: data.message ? data.message : "Error en el mensaje",
          });
          if (data && data.status === 1) {
            reload();
            setOpen(false);
          }
        },
        (error) => {
          setSnackbar({ open: true, message: "Error en el servidor" });
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth={true}
        component="form"
        onSubmit={handleSubmit}
      >
        <DialogTitle>P r o f e s o r</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="code"
            label="Código"
            type="code"
            fullWidth
            name="code"
            defaultValue={teacher.code}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            margin="dense"
            id="fullName"
            label="Nombre Completo"
            type="fullName"
            fullWidth
            name="fullName"
            defaultValue={teacher.fullName}
            sx={{ mb: 2 }}
          />
          <DialogActions sx={{ pr: 0 }}>
            <Button onClick={handleClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={isLoading}>
              {teacher._id ? "Actualizar" : "Agregar"}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeacherSaveDialog;
