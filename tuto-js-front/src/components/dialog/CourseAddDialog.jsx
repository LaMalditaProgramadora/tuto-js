import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { addTutor } from "../../services/CourseService";
import { listAll } from "../../services/TutorService";

const CourseAddDialog = ({ idCourse, open, setOpen, reload, setSnackbar }) => {
  const [tutors, setTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const listAllFromApi = () => {
    listAll().then(
      (data) => {
        if (data && data.data) {
          setTutors(data.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const courseDto = {
      idCourse: idCourse,
      idTutor: formData.get("tutor"),
    };
    addTutor(courseDto).then(
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
  };

  useEffect(() => {
    listAllFromApi();
  }, []);

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
        <DialogTitle>T u t o r</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="tutorLabel">Tutor</InputLabel>
                <Select
                  labelId="tutorLabel"
                  id="tutor"
                  label="Tutor"
                  required
                  name="tutor"
                  defaultValue=""
                >
                  {tutors.map((tutor) => {
                    return (
                      <MenuItem key={tutor._id} value={tutor._id}>
                        {tutor.code}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <DialogActions sx={{ pr: 0 }}>
            <Button onClick={handleClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={isLoading}>
              Agregar
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseAddDialog;
