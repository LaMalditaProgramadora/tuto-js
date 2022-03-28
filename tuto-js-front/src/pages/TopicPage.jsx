import { Typography } from "@mui/material";
import { useEffect } from "react";

const TopicPage = ({ setTitle }) => {
  const setLocalTitle = () => {
    setTitle("Temas");
  };

  useEffect(() => {
    setLocalTitle();
  }, []);
  return (
    <>
      <Typography color="text.secondary">Topic</Typography>
    </>
  );
};

export default TopicPage;
