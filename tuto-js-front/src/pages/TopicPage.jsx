import Add from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import TopicSaveDialog from "../components/dialog/TopicSaveDialog";
import DataTable from "../components/table/DataTable";
import { getColumns } from "../components/table/_columns";
import { listAll, remove } from "../services/TopicService";
import { getTopicsWithCourse } from "../utils/arrayHelper";
import { getUser } from "../utils/storage";
import { useNavigate } from "react-router-dom";

const TopicPage = ({ setTitle, setSnackbar }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState({
    description: "",
    course: { _id: "0", code: "", name: "" },
  });
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const validateUser = () => {
    console.log(getUser() || getUser().type !== "administrator");
    if (!getUser() || getUser().type !== "administrator")
      navigate("/login", { replace: true });
  };

  const setLocalTitle = () => {
    setTitle("Temas");
  };

  const listAllFromApi = async () => {
    listAll().then(
      (data) => {
        if (data && data.data) {
          setRows(getTopicsWithCourse(data.data));
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
    setSelectedTopic(row);
    setOpen(true);
  };

  const openCreate = () => {
    setSelectedTopic({ code: "", name: "" });
    setOpen(true);
  };

  useEffect(() => {
    validateUser();
    setLocalTitle();
    setColumns(getColumns("topic", openEdit, removeFromApi));
    listAllFromApi();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <TopicSaveDialog
        topic={selectedTopic}
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

export default TopicPage;
