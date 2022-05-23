import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { listByStudent as listSectionsByStudent } from "../../services/SectionService";
import { listByCourse as listTopicsByCourse } from "../../services/TopicService";
import { listByCourse as listTutorsByCourse } from "../../services/TutorService";
import { create, uploadImage } from "../../services/TutorshipService";
import { getUser } from "../../utils/storage";
import socket from "../../utils/socket";

const TutorshipCreateDialog = ({ open, setOpen, reload, setSnackbar }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [sections, setSections] = React.useState([]);
  const [topics, setTopics] = React.useState([]);
  const [tutors, setTutors] = React.useState([]);
  const [disabled, setDisabled] = React.useState(true);
  const [file, setFile] = React.useState(null);


  const handleClose = () => {
    setDisabled(true);
    setOpen(false);
  };

  const getSectionsfromApi = () => {
    listSectionsByStudent(getUser()._id).then(
      (data) => {
        if (data && data.data) {
          setSections(data.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleFilesChange = (event) => {
    setFile(event.target.files[0]);
  };

  const getTopicsFromApi = (idCourse) => {
    listTopicsByCourse(idCourse).then(
      (data) => {
        if (data && data.data) {
          setTopics(data.data);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const getTutorsFromApi = (idCourse) => {
    listTutorsByCourse(idCourse).then(
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

  React.useEffect(() => {
    getSectionsfromApi();
  }, []);

  const handleChangeCourse = (event) => {
    const idCourse = JSON.parse(event.target.value).course._id;
    getTutorsFromApi(idCourse);
    getTopicsFromApi(idCourse);
    setDisabled(false);
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const section = JSON.parse(formData.get("section"));

    const tutorshipDto = {
      section: section._id,
      course: section.course._id,
      tutor: formData.get("tutor"),
      student: getUser()._id,
      topic: formData.get("topic"),
      reason: formData.get("reason"),
      registerDate: new Date(),
      attended: false,
      teacher: section.teacher._id,
    };

    uploadImage(file).then((data) => {
      if (data.status === 1) {
        tutorshipDto.image = data.data;
      }

      create(tutorshipDto).then(
        (data) => {
          setIsLoading(false);
          setSnackbar({
            open: true,
            message: data.message ? data.message : "Error en el mensaje",
          });
          if (data && data.status === 1) {
            socket.emit('create tutorship');
            reload();
            setOpen(false);
          }
        },
        (error) => {
          setSnackbar({ open: true, message: "Error en el servidor" });
          setIsLoading(false);
        }
      );
    });
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
        <DialogTitle>T u t o r í a</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6} sx={{ mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="courseLabel">Curso</InputLabel>
                <Select
                  labelId="courseLabel"
                  id="section"
                  label="Curso"
                  required
                  name="section"
                  defaultValue=""
                  onChange={handleChangeCourse}
                >
                  {sections.map((section) => {
                    return (
                      <MenuItem
                        key={section.course._id}
                        value={JSON.stringify(section)}
                      >
                        {section.course.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="tutorLabel">Tutor</InputLabel>
                <Select
                  labelId="tutorLabel"
                  id="tutor"
                  label="Tutor"
                  required
                  name="tutor"
                  defaultValue=""
                  disabled={disabled}
                >
                  {tutors.map((tutor) => {
                    return (
                      <MenuItem key={tutor._id} value={tutor._id}>
                        {tutor.fullName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="topicLabel">Tema</InputLabel>
                <Select
                  labelId="topicLabel"
                  id="topic"
                  label="Tema"
                  required
                  name="topic"
                  defaultValue=""
                  disabled={disabled}
                >
                  {topics.map((topic) => {
                    return (
                      <MenuItem key={topic._id} value={topic._id}>
                        {topic.description}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                margin="dense"
                id="reason"
                label="Motivo"
                type="text"
                fullWidth
                name="reason"
                defaultValue=""
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <input
                color="primary"
                accept="image/*"
                type="file"
                onChange={handleFilesChange}
                id="icon-button-file"
              />
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

export default TutorshipCreateDialog;
