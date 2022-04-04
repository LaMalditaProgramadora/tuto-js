import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { create, update } from "../../services/SectionService";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { listAll as listAllTeachers } from "../../services/TeacherService";
import { listAll as listAllCourses } from "../../services/CourseService";

const SectionSaveDialog = ({ section, open, setOpen, reload, setSnackbar }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);
  const thisSection =
    section.teacher !== undefined && section.course !== undefined
      ? section
      : {
          ...section,
          teacher: { _id: "", fullName: "" },
          course: { _id: "", name: "" },
        };

  const handleClose = () => {
    setOpen(false);
  };

  const getCoursesFromApi = () => {
    listAllCourses().then(
      (data) => {
        if (data && data.data) {
          setCourses(data.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getTeacherFromApi = () => {
    listAllTeachers().then(
      (data) => {
        if (data && data.data) {
          setTeachers(data.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  React.useEffect(() => {
    getCoursesFromApi();
    getTeacherFromApi();
  }, []);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const sectionDto = {
      code: formData.get("code"),
      period: formData.get("period"),
      teacher: formData.get("teacher"),
      course: formData.get("course"),
    };
    console.log(sectionDto);
    if (section._id) {
      sectionDto._id = thisSection._id;
      update(sectionDto).then(
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
      create(sectionDto).then(
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
        <DialogTitle>S e c c i ó n</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                id="code"
                label="Código"
                type="text"
                fullWidth
                name="code"
                defaultValue={thisSection.code}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                margin="dense"
                id="period"
                label="Periodo"
                type="text"
                fullWidth
                name="period"
                defaultValue={thisSection.period}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="courseLabel">Curso</InputLabel>
                <Select
                  labelId="courseLabel"
                  id="course"
                  label="Curso"
                  required
                  name="course"
                  defaultValue={thisSection.course._id}
                >
                  {courses.map((course) => {
                    return (
                      <MenuItem key={course._id} value={course._id}>
                        {course.code}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="teacherLabel">Profesor</InputLabel>
                <Select
                  labelId="teacherLabel"
                  id="teacher"
                  label="Profesor"
                  required
                  name="teacher"
                  defaultValue={thisSection.teacher._id}
                >
                  {teachers.map((teacher) => {
                    return (
                      <MenuItem key={teacher._id} value={teacher._id}>
                        {teacher.code}
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
              {section._id ? "Actualizar" : "Agregar"}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SectionSaveDialog;
