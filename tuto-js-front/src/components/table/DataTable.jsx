import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable({ columns, rows }) {
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        autoHeight
        disableSelectionOnClick
      showColumnRightBorder={true}
        sx={{
          "& *:focus": {
            outline: "none !important",
          },
        }}
      />
    </div>
  );
}
