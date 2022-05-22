import { Grid } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { formatDate } from "../../utils/arrayHelper";

const TutorshipDetailDialog = ({ tutorship, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth={true}
        component="form"
      >
        <DialogTitle>T u t o r í a</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={6}>
              <TextField
                inputProps={{ readOnly: true }}
                margin="dense"
                id="registerDate"
                label="Fecha de Registro"
                type="text"
                fullWidth
                name="registerDate"
                defaultValue={formatDate(tutorship.registerDate)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                inputProps={{ readOnly: true }}
                margin="dense"
                id="attendedDate"
                label="Fecha de Atención"
                type="text"
                fullWidth
                name="attendedDate"
                defaultValue={formatDate(tutorship.attendedDate)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                inputProps={{ readOnly: true }}
                margin="dense"
                id="course"
                label="Curso"
                type="text"
                fullWidth
                name="course"
                defaultValue={tutorship.course.name}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                inputProps={{ readOnly: true }}
                margin="dense"
                id="section"
                label="Sección"
                type="text"
                fullWidth
                name="section"
                defaultValue={tutorship.section.code}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                inputProps={{ readOnly: true }}
                margin="dense"
                id="student"
                label="Estudiante"
                type="text"
                fullWidth
                name="student"
                defaultValue={tutorship.student.fullName}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                inputProps={{ readOnly: true }}
                margin="dense"
                id="tutor"
                label="Tutor"
                type="text"
                fullWidth
                name="tutor"
                defaultValue={tutorship.tutor.fullName}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{ readOnly: true }}
                margin="dense"
                id="topic"
                label="Tema"
                type="text"
                fullWidth
                name="topic"
                defaultValue={tutorship.topic.description}
                sx={{ mb: 2, color: "black" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{ readOnly: true }}
                margin="dense"
                id="reason"
                label="Motivo"
                type="text"
                fullWidth
                name="reason"
                defaultValue={tutorship.reason}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputProps={{ readOnly: true }}
                margin="dense"
                id="solution"
                label="Solución"
                type="text"
                fullWidth
                name="solution"
                defaultValue={tutorship.solution}
                sx={{ mb: 2, color: "black" }}
              />
            </Grid>
            <Grid item xs={12}>
              <img
                src={
                  tutorship.image
                    ? tutorship.image
                    : "https://sesupport.edumall.jp/hc/article_attachments/900009570963/noImage.jpg"
                }
                alt={tutorship._id}
                style={{ width: 300, borderRadius: 8 }}
              ></img>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TutorshipDetailDialog;
