import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { update } from "../../services/TutorshipService";

const TutorshipUpdateDialog = ({
  tutorship,
  open,
  setOpen,
  reload,
  setSnackbar,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {}, []);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const tutorshipDto = {
      _id: tutorship._id,
      attendedDate: new Date(),
      attended: true,
      solution: formData.get("solution"),
    };

    update(tutorshipDto).then(
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
            <Grid item xs={12}>
              <TextField
                required
                margin="dense"
                id="solution"
                label="Solución"
                type="text"
                fullWidth
                name="solution"
                defaultValue={tutorship.solution}
                sx={{ mb: 2 }}
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

export default TutorshipUpdateDialog;
