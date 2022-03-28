import { Typography } from "@mui/material";
import { useEffect } from "react";

const StudentPage = ({ setTitle }) => {
  const setLocalTitle = () => {
    setTitle("Estudiantes");
  };

  useEffect(() => {
    setLocalTitle();
  }, []);
  return (
    <>
      <Typography color="text.secondary">Student</Typography>
    </>
  );
};

export default StudentPage;
