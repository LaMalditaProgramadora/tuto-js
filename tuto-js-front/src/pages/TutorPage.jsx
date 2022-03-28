import { Typography } from "@mui/material";
import { useEffect } from "react";

const TutorPage = ({ setTitle }) => {
  const setLocalTitle = () => {
    setTitle("Tutores");
  };

  useEffect(() => {
    setLocalTitle();
  }, []);
  return (
    <>
      <Typography color="text.secondary">Tutor</Typography>
    </>
  );
};

export default TutorPage;
