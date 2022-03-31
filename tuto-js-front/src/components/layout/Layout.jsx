import { Snackbar, SnackbarContent } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import Navigator from "./Navigator";
import { customTheme, drawerWidth } from "./_styles";

const Layout = ({ title, snackbar, setSnackbar }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const separateTitle = (titleString) => {
    let titleAux = "";
    for (let i = 0; i < titleString.length; i++) {
      titleAux = titleAux.concat(titleString[i]).concat(" ");
    }
    return titleAux;
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const changeTitle = (c) => {
    navigate("/tuto/" + c.route, { replace: true });
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Navigator title={title} changeTitle={changeTitle} />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Header
            onDrawerToggle={handleDrawerToggle}
            title={separateTitle(title)}
          />
          <Box
            component="main"
            sx={{ flex: 1, py: 4, px: 4, bgcolor: "#eaeff1" }}
          >
            <Content />
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
            <Footer />
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ open: false, message: "" })}
      >
        <SnackbarContent
          sx={{ backgroundColor: "#009be5" }}
          message={snackbar.message}
        />
      </Snackbar>
    </ThemeProvider>
  );
};

export default Layout;
