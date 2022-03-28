import { Typography } from "@mui/material";
import { useEffect } from "react";

const TutorshipPage = ({ setTitle }) => {
  const setLocalTitle = () => {
    setTitle("Tutorías");
  };

  useEffect(() => {
    setLocalTitle();
  }, []);
  return (
    <>
      <Typography color="text.secondary">Tutorship</Typography>
    </>
  );
};

export default TutorshipPage;
