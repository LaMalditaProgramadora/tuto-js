import { Typography } from "@mui/material";
import { useEffect } from "react";

const SectionPage = ({ setTitle }) => {
  const setLocalTitle = () => {
    setTitle("Secciones");
  };

  useEffect(() => {
    setLocalTitle();
  }, []);
  return (
    <>
      <Typography color="text.secondary">Section</Typography>
    </>
  );
};

export default SectionPage;
