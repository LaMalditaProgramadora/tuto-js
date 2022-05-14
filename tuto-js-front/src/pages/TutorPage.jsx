import Add from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TutorSaveDialog from "../components/dialog/TutorSaveDialog";
import DataTable from "../components/table/DataTable";
import { getColumns } from "../components/table/_columns";
import { listAll, remove } from "../services/TutorService";
import { getArrayWithId } from "../utils/arrayHelper";
import { getUser } from "../utils/storage";

const TutorPage = ({ setTitle, setSnackbar }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState({
    code: "",
    name: "",
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const validateUser = () => {
    console.log(getUser() || getUser().type !== "administrator");
    if (getUser() === undefined) navigate("/login", { replace: true });
  };

  const setLocalTitle = () => {
    setTitle("Tutores");
  };

  const listAllFromApi = () => {
    listAll().then(
      (data) => {
        if (data && data.data) {
          setRows(getArrayWithId(data.data));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const removeFromApi = ({ row }) => {
    remove(row._id).then(
      (data) => {
        setSnackbar({
          open: true,
          message: data.message ? data.message : "Error en el mensaje",
        });
        if (data && data.status === 1) {
          listAllFromApi();
        }
      },
      (error) => {
        setSnackbar({ open: true, message: "Error en el servidor" });
        console.log(error);
      }
    );
  };

  const openEdit = ({ row }) => {
    setSelectedTutor(row);
    setOpen(true);
  };

  const openCreate = () => {
    setSelectedTutor({ code: "", name: "" });
    setOpen(true);
  };

  useEffect(() => {
    validateUser();
    setLocalTitle();
    setColumns(getColumns("tutor", openEdit, removeFromApi));
    listAllFromApi();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <TutorSaveDialog
        tutor={selectedTutor}
        open={open}
        setOpen={setOpen}
        reload={listAllFromApi}
        setSnackbar={setSnackbar}
      />
      <Button variant="contained" sx={{ mb: 2 }} onClick={openCreate}>
        <Add />
        <Typography sx={{ mr: 1 }}>Agregar</Typography>
      </Button>
      <DataTable rows={rows} columns={columns} />
    </div>
  );
};

export default TutorPage;
