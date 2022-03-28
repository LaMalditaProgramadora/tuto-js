import { Typography } from "@mui/material";
import { useEffect } from "react";

const TeacherPage = ({ setTitle }) => {
  const setLocalTitle = () => {
    setTitle("Profesores");
  };

  useEffect(() => {
    setLocalTitle();
  }, []);
  return (
    <>
      <Typography color="text.secondary">Teacher</Typography>
    </>
  );
};

export default TeacherPage;
