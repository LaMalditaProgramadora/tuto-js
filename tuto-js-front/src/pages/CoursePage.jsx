import { Typography } from "@mui/material";
import { useEffect } from "react";

const CoursePage = ({ setTitle }) => {
  const setLocalTitle = () => {
    setTitle("Cursos");
  };

  useEffect(() => {
    setLocalTitle();
  }, []);

  return (
    <>
      <Typography color="text.secondary">Course</Typography>
    </>
  );
};

export default CoursePage;
