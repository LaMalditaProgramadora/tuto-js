import Paper from "@mui/material/Paper";
import { Outlet } from "react-router-dom";
import * as React from "react";

const Content = () => {
  return (
    <Paper sx={{ overflow: "hidden", py: 2, px: 2 }}>
       <Outlet />
    </Paper>
  );
};

export default Content;
