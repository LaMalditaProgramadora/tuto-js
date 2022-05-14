import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import { getUser } from "../../utils/storage";
import { categories } from "./_categories";
import { drawerWidth, itemCategory, itemWithoutHover } from "./_styles";

const Navigator = ({ title, changeTitle }) => {
  const selectCategory = (c) => {
    changeTitle(c);
  };

  const thisCategories =
    getUser().type === "administrator" ? categories : [categories[0]];

  return (
    <Drawer
      variant="permanent"
      sx={{ display: { sm: "block", xs: "none" } }}
      PaperProps={{ style: { width: drawerWidth } }}
    >
      <List disablePadding>
        <ListItem
          sx={{
            ...itemWithoutHover,
            ...itemCategory,
            fontSize: 22,
            color: "#fff",
          }}
        >
          T U T O
        </ListItem>
        {thisCategories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map((c) => (
              <ListItem disablePadding key={c.id} sx={{ color: "white" }}>
                <ListItemButton
                  selected={c.id === title}
                  sx={c.item}
                  onClick={() => selectCategory(c)}
                >
                  <ListItemIcon>{c.icon}</ListItemIcon>
                  <ListItemText>{c.id}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default Navigator;
