import { Container, Grid as MUIGrid } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";


const Grid = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((res) => setProducts(res.products));
  }, []);

  return (
    <Container sx={{ pt: 5 }}>
      <MUIGrid container spacing={3}>
        {products.map((product) => (
          <MUIGrid
            sx={{ display: "flex", justifyContent: "center" }}
            item
            key={product.id}
            xs={12}
            md={6}
            lg={4}
          >
            <ProductCard product={product} />
          </MUIGrid>
        ))}
      </MUIGrid>
    </Container>
  );
};

export default Grid;
