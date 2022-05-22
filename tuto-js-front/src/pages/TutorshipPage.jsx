import Add from "@mui/icons-material/Add";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TutorshipCreateDialog from "../components/dialog/TutorshipCreateDialog";
import TutorshipUpdateDialog from "../components/dialog/TutorshipUpdateDialog";
import TutorshipDetailDialog from "../components/dialog/TutorshipDetailDialog";
import DataTable from "../components/table/DataTable";
import { getColumns } from "../components/table/_columns";
import { listAll, remove } from "../services/TutorshipService";
import { getTutorshipssWithAllToStudent } from "../utils/arrayHelper";
import { getUser } from "../utils/storage";

const TutorshipPage = ({ setTitle, setSnackbar }) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectedTutorship, setSelectedTutorship] = useState({
    registerDate: new Date(),
    attended: false,
    course: { _id: "0", code: "", name: "" },
    section: { _id: "0", code: "" },
    student: { _id: "0", code: "", fullName: "" },
    tutor: { _id: "0", code: "", fullName: "" },
    topic: { _id: "0", description: "" },
  });
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const navigate = useNavigate();
  const validateUser = () => {
    console.log(getUser());
    if (getUser() === undefined) navigate("/login", { replace: true });
  };

  const setLocalTitle = () => {
    setTitle("Tutorías");
  };

  const listAllFromApi = async () => {
    listAll().then(
      (data) => {
        if (data && data.data) {
          setRows(getTutorshipssWithAllToStudent(data.data));
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

  const openUpdateDialog = ({ row }) => {
    setSelectedTutorship(row);
    setOpenUpdate(true);
  };

  const openDetailDialog = ({ row }) => {
    setSelectedTutorship(row);
    setOpenDetail(true);
  };

  const openCreateDialog = () => {
    setSelectedTutorship({ code: "", name: "" });
    setOpenCreate(true);
  };

  useEffect(() => {
    validateUser();
    setLocalTitle();
    setColumns(
      getColumns(
        "tutorship",
        openUpdateDialog,
        removeFromApi,
        null,
        openDetailDialog
      )
    );
    listAllFromApi();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <TutorshipCreateDialog
        tutorship={selectedTutorship}
        open={openCreate}
        setOpen={setOpenCreate}
        reload={listAllFromApi}
        setSnackbar={setSnackbar}
      />
      <TutorshipUpdateDialog
        tutorship={selectedTutorship}
        open={openUpdate}
        setOpen={setOpenUpdate}
        reload={listAllFromApi}
        setSnackbar={setSnackbar}
      />
      <TutorshipDetailDialog
        tutorship={selectedTutorship}
        open={openDetail}
        setOpen={setOpenDetail}
        setSnackbar={setSnackbar}
      />
      {getUser().type === "student" ? (
        <Button variant="contained" sx={{ mb: 2 }} onClick={openCreateDialog}>
          <Add />
          <Typography sx={{ mr: 1 }}>Agregar</Typography>
        </Button>
      ) : (
        <></>
      )}
      <DataTable rows={rows} columns={columns} />
    </div>
  );
};

export default TutorshipPage;
