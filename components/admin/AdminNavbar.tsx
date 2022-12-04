import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useContext } from "react";
import { UiContext } from "../../context";

export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink
          href="/"
          passHref
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="primary">
            Teslo |
          </Typography>
          <Typography color="primary" sx={{ ml: 0.5 }}>
            Shop
          </Typography>
        </NextLink>
        <Box flex={1} />

        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
