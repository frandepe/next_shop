import { Typography } from "@mui/material";

import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { FullScreenLoading } from "../components/ui";
import { useProducts } from "../hooks";

export default function HomePage() {
  const { products, isLoading } = useProducts("/products");

  return (
    <ShopLayout
      pageDescription={"Encuentra los mejores productos aquí"}
      title={"Teslo-Shop - Home"}
    >
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
