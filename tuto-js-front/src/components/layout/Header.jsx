import Logout from "@mui/icons-material/Logout";
import { ListItem, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { itemCategory, itemWithoutHover } from "./_styles";
import { getUser } from "../../utils/storage";

const Header = ({ title }) => {
  const code = getUser().code;
  const navigate = useNavigate();
  const logout = () => {
    navigate("/login", { replace: true });
  };

  const alterCode = (codeString) => {
    let codeAux = "";
    for (let i = 0; i < codeString.length; i++) {
      codeAux = codeAux.concat(codeString[i]).concat(" ");
    }
    return codeAux;
  };

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
              <Typography>{alterCode(code)}</Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Cerrar Sesión">
                <IconButton color="inherit" onClick={logout}>
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
