import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/ResetPasswordService";
import { removeUser } from "../utils/storage";

const ResetPasswordPage = ({ setSnackbar }) => {
  const navigate = useNavigate();
  const initLocalStorage = () => {
    removeUser();
  };

  useEffect(() => {
    initLocalStorage();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = {
      code: formData.get("code"),
    };
    if (user.username !== "" && user.password !== "") {
      resetPassword(formData.get("type"), user).then((data) => {
        setSnackbar({ open: true, message: data.message });
        if (data.status === 1) {
          navigate("/login", { replace: true });
        }
      });
    } else {
      setSnackbar({ open: true, message: "Ingrese todos los campos" });
    }
  };

  return (
    <>
      <Typography sx={{ mb: 2 }}>
        R e s e t e a r &nbsp; C o n s t r a s e ñ a
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="courtypeLabelseLabel">Tipo de Usuario</InputLabel>
          <Select
            labelId="typeLabel"
            id="type"
            label="Tipo de Usuario"
            required
            name="type"
            defaultValue="student"
            sx={{ mb: 2 }}
          >
            <MenuItem key="student" value="student">
              Estudiante
            </MenuItem>
            <MenuItem key="tutor" value="tutor">
              Tutor
            </MenuItem>
            <MenuItem key="teacher" value="teacher">
              Profesor
            </MenuItem>
            <MenuItem key="administrator" value="administrator">
              Administrador
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          required
          fullWidth
          id="code"
          label="Código"
          name="code"
          autoComplete="username"
          sx={{ mb: 2 }}
        />
        <Box sx={{ textAlign: "center" }}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2, textTransform: "none" }}
          >
            <Typography>Enviar correo</Typography>
          </Button>
          <br></br>
          <Link href="/login" variant="body2">
            Volver
          </Link>
        </Box>
        <br></br>
      </Box>
    </>
  );
};

export default ResetPasswordPage;
