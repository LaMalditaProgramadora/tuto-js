import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { create, update } from "../../services/CourseService";

const CourseSaveDialog = ({ course, open, setOpen, reload, setSnackbar }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const courseDto = {
      code: formData.get("code"),
      name: formData.get("name"),
    };
    if (course._id) {
      courseDto._id = course._id;
      update(courseDto).then(
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
      create(courseDto).then(
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
        <DialogTitle>C u r s o</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="code"
            label="Código"
            type="code"
            fullWidth
            name="code"
            defaultValue={course.code}
            sx={{ mb: 2 }}
          />
          <TextField
            required
            margin="dense"
            id="name"
            label="Nombre"
            type="name"
            fullWidth
            name="name"
            defaultValue={course.name}
            sx={{ mb: 2 }}
          />
          <DialogActions sx={{ pr: 0 }}>
            <Button onClick={handleClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={isLoading}>
              {course._id ? "Actualizar" : "Agregar"}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseSaveDialog;
