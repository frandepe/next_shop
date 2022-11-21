import { Box, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { GetServerSideProps } from "next";
import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

export default function SearchPage({ products, foundProducts, query }: Props) {
  return (
    <ShopLayout
      pageDescription={"Encuentra los mejores productos aquí"}
      title={"Teslo-Shop - Search"}
    >
      <Typography variant="h1" component="h1">
        Buscar producto
      </Typography>
      {foundProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">
          Termino: {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">
            No encontramos ningún producto
          </Typography>
          <Typography variant="h2" sx={{ ml: 1 }} color="secondary">
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
}

//*No usamos getStaticPath y getStaticProps en este caso porque
//* se va a crear una pagina por cada busqueda innecesaria que haga el usuario
//* si busca asd123 se va a crear una nueva pagina asd123

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  //* lo hacemos con let porque si no hay resultado de busqueda
  //* podemos ofrecerle al usuario otros productos
  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    // products = await dbProducts.getAllProducts();
    products = await dbProducts.getProductsByTerm("shirt");
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};
