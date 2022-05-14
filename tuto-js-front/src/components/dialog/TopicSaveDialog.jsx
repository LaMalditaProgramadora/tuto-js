import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { create, update } from "../../services/TopicService";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { listAll as listAllCourses } from "../../services/CourseService";

const TopicSaveDialog = ({ topic, open, setOpen, reload, setSnackbar }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const thisTopic =
    topic.course !== undefined
      ? topic
      : {
          ...topic,
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

  React.useEffect(() => {
    getCoursesFromApi();
  }, []);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const topicDto = {
      description: formData.get("description"),
      course: formData.get("course"),
    };
    if (topic._id) {
      topicDto._id = thisTopic._id;
      update(topicDto).then(
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
      create(topicDto).then(
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
        <DialogTitle>T e m a</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <TextField
                required
                margin="dense"
                id="description"
                label="Descripción"
                type="text"
                fullWidth
                name="description"
                defaultValue={thisTopic.description}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="courseLabel">Curso</InputLabel>
                <Select
                  labelId="courseLabel"
                  id="course"
                  label="Curso"
                  required
                  name="course"
                  defaultValue={thisTopic.course._id}
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
          </Grid>
          <DialogActions sx={{ pr: 0 }}>
            <Button onClick={handleClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={isLoading}>
              {topic._id ? "Actualizar" : "Agregar"}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TopicSaveDialog;
