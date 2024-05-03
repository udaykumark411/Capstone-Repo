// ProductList.js

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Button,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products }) => {
  const [page, setPage] = useState(1);
  const productsPerPage = 8;
  const navigate = useNavigate();

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      <Grid container spacing={2}>
        {currentProducts.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card
              style={{ height: "100%", cursor: "pointer" }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {" "}
              <CardMedia
                component="img"
                height="200"
                image={product.url}
                alt={product.title.shortTitle}
              />
              <CardContent style={{ minHeight: "150px" }}>
                <Typography variant="subtitle1">
                  {product.title.longTitle}
                </Typography>
                <Typography variant="body1">
                  Price:{" "}
                  <span style={{ fontSize: 28 }}>${product.price.cost}</span>
                </Typography>
                <Typography variant="body2">
                  Discount:{" "}
                  <span style={{ color: "#388E3C" }}>{product.discount}</span>
                </Typography>
                <Typography variant="body2">
                  Description: {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: 20 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Grid>
    </div>
  );
};

export default ProductList;
