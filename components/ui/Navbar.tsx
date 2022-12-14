import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Badge,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";

import {
  SearchOutlined,
  ShoppingCartOutlined,
  ClearOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UiContext, CartContext } from "../../context";

export const Navbar = () => {
  const { toggleSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);
  const { asPath, push } = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  // console.log(router) --> asPath o route.. podemos usar

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

        <Box
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
          className="fadeIn"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <NextLink
            href="/category/men"
            passHref
            style={{ textDecoration: "none" }}
          >
            <Button color={asPath === "/category/men" ? "primary" : "info"}>
              Hombres
            </Button>
          </NextLink>
          <NextLink
            href="/category/women"
            passHref
            style={{ textDecoration: "none" }}
          >
            <Button color={asPath === "/category/women" ? "primary" : "info"}>
              Mujeres
            </Button>
          </NextLink>
          <NextLink
            href="/category/kid"
            passHref
            style={{ textDecoration: "none" }}
          >
            <Button color={asPath === "/category/kid" ? "primary" : "info"}>
              Ni??os
            </Button>
          </NextLink>
        </Box>

        <Box flex={1} />

        {/* pantallas grandes */}

        {isSearchVisible ? (
          <Input
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsSearchVisible(true)}
            className="fadeIn"
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* pantallas peque??as */}
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref>
          <IconButton>
            <Badge
              badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
              color="secondary"
            >
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </NextLink>

        <Button onClick={toggleSideMenu}>Men??</Button>
      </Toolbar>
    </AppBar>
  );
};
