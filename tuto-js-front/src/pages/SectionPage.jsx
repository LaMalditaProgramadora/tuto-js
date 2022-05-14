import Add from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionListDialog from "../components/dialog/SectionListDialog";
import SectionSaveDialog from "../components/dialog/SectionSaveDialog";
import DataTable from "../components/table/DataTable";
import { getColumns } from "../components/table/_columns";
import { listAll, remove } from "../services/SectionService";
import { getSectionsWithTeacherAndCourse } from "../utils/arrayHelper";
import { getUser } from "../utils/storage";

const SectionPage = ({ setTitle, setSnackbar }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedSection, setSelectedSection] = useState({
    code: "",
    period: "",
    teacher: { _id: "0", code: "", fullName: "" },
    course: { _id: "0", code: "", name: "" },
  });
  const [open, setOpen] = useState(false);
  const [openStudents, setOpenStudents] = useState(false);

  const navigate = useNavigate();
  const validateUser = () => {
    if (!getUser() || getUser().type !== "administrator")
      navigate("/login", { replace: true });
  };

  const setLocalTitle = () => {
    setTitle("Secciones");
  };

  const listAllFromApi = async () => {
    listAll().then(
      (data) => {
        if (data && data.data) {
          setRows(getSectionsWithTeacherAndCourse(data.data));
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
    setSelectedSection(row);
    setOpen(true);
  };

  const openCreate = () => {
    setSelectedSection({ code: "", name: "" });
    setOpen(true);
  };

  const openList = ({ row }) => {
    setSelectedSection(row);
    setOpenStudents(true);
  };

  useEffect(() => {
    validateUser();
    setLocalTitle();
    setColumns(getColumns("section", openEdit, removeFromApi, openList));
    listAllFromApi();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <SectionSaveDialog
        section={selectedSection}
        open={open}
        setOpen={setOpen}
        reload={listAllFromApi}
        setSnackbar={setSnackbar}
      />
      <SectionListDialog
        section={selectedSection}
        open={openStudents}
        setOpen={setOpenStudents}
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

export default SectionPage;
