import NextLink from "next/link";
import { ShopLayout } from "../../components/layouts";
import { Box, Typography, Link } from "@mui/material";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";

const EmptyPage = () => {
  //   const [hasWindow, setHasWindow] = useState(false);

  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       setHasWindow(true);
  //     }
  //   }, []);

  return (
    <ShopLayout
      pageDescription="No hay artículos en en el carrito de compras"
      title="Carrito vacío"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>Su carrito está vacío</Typography>
          {/* {hasWindow && ( */}
          <NextLink href="/" passHref style={{ textDecoration: "none" }}>
            <Link typography="h4" color="secondary" component="div">
              Regresar
            </Link>
          </NextLink>
          {/* )} */}
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
