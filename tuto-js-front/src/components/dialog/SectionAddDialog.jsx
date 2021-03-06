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
import { addStudent } from "../../services/SectionService";
import { listAll } from "../../services/StudentService";

const SectionAddDialog = ({
  idSection,
  open,
  setOpen,
  reload,
  setSnackbar,
}) => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const listAllFromApi = () => {
    listAll().then(
      (data) => {
        if (data && data.data) {
          setStudents(data.data);
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
    const sectionDto = {
      idSection: idSection,
      idStudent: formData.get("student"),
    };
    addStudent(sectionDto).then(
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
        <DialogTitle>E s t u d i a n t e</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="studentLabel">Estudiante</InputLabel>
                <Select
                  labelId="studentLabel"
                  id="student"
                  label="Estudiante"
                  required
                  name="student"
                  defaultValue=""
                >
                  {students.map((student) => {
                    return (
                      <MenuItem key={student._id} value={student._id}>
                        {student.code}
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

export default SectionAddDialog;
