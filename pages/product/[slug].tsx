import { ShopLayout } from "../../components/layouts";
import { Grid, Typography, Button, Box } from "@mui/material";
import {
  NextPage,
  GetServerSideProps,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { IProduct } from "../../interfaces";
import { dbProducts } from "../../database";
import { getAllProductSlugs } from "../../database/dbProducts";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  //? Esta seria una manera de hacerlo,
  //? Pero quiero que esta pagina venga pregenerada del lado del servidor
  //? el porque de no hacerlo así es por que no tenemos SEO
  //? Esto estaría bien en una SPA pero no en next
  // const router = useRouter()
  //* console.log(router) --> query.slug

  // const {products: product, isLoading} = useProducts<IProduct>(`/products/${router.query.slug}`)

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* titulos */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="h1" component="h2">
              ${product.price}
            </Typography>
            {/* cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter />
              <SizeSelector
                // selectedSize={product.sizes[0]}
                sizes={product.sizes}
              />
            </Box>
            <Button color="secondary" className="circular-btn">
              Agregar al carrito
            </Button>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descriptión</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
            {/* <Chip label="No hay disponibles" color="error" variant="outlined" /> */}
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

//* No usar SSR, aunque no estaría mal

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   console.log(params);

//   const { slug = "" } = params as { slug: string };

//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { product },
//   };
// };

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map((obj) => ({
      params: { slug: obj.slug },
    })),
    fallback: "blocking",
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBySlug(slug);
  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
