import Logout from "@mui/icons-material/Logout";
import { ListItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import * as React from "react";
import { itemCategory, itemWithoutHover } from "./_styles";

const Header = ({ title }) => {
  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <ListItem
                sx={{
                  ...itemWithoutHover,
                  ...itemCategory,
                  fontSize: 22,
                  px: 1,
                  color: "#fff",
                }}
              >
                {title}
              </ListItem>
            </Grid>
            <Grid item>
              <Tooltip title="Cerrar Sesión">
                <IconButton color="inherit">
                  <Logout />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
