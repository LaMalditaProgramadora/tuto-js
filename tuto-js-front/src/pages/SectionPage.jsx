import Add from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SectionSaveDialog from "../components/dialog/SectionSaveDialog";
import DataTable from "../components/table/DataTable";
import { getColumns } from "../components/table/_columns";
import { listAll, remove } from "../services/SectionService";
import { getSectionsWithTeacherAndCourse } from "../utils/arrayHelper";

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

  const openAdd = () => {
    setSelectedSection({ code: "", name: "" });
    setOpen(true);
  };

  useEffect(() => {
    setLocalTitle();
    setColumns(getColumns("section", openEdit, removeFromApi));
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
      <Button variant="contained" sx={{ mb: 2 }} onClick={openAdd}>
        <Add />
        <Typography sx={{ mr: 1 }}>Agregar</Typography>
      </Button>
      <DataTable rows={rows} columns={columns} />
    </div>
  );
};

export default SectionPage;
