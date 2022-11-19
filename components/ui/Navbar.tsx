import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Link,
  Box,
  Typography,
  Button,
  Badge,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";

export const Navbar = () => {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);
  return (
    <AppBar>
      {hasWindow && (
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

          <Box
            sx={{ display: { xs: "none", sm: "block" } }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <NextLink
              href="/category/men"
              passHref
              style={{ textDecoration: "none" }}
            >
              <Button>Hombre</Button>
            </NextLink>
            <NextLink
              href="/category/women"
              passHref
              style={{ textDecoration: "none" }}
            >
              {/* <Link component="h5"> */}
              <Button>Mujeres</Button>
              {/* </Link> */}
            </NextLink>
            <NextLink
              href="/category/kid"
              passHref
              style={{ textDecoration: "none" }}
            >
              <Button>Niños</Button>
            </NextLink>
          </Box>

          <Box flex={1} />

          <IconButton>
            <SearchOutlined />
          </IconButton>

          <NextLink href="/cart" passHref>
            <Link>
              <IconButton>
                <Badge badgeContent={2} color="secondary">
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </Link>
          </NextLink>

          <Button>Menú</Button>
        </Toolbar>
      )}
    </AppBar>
  );
};
