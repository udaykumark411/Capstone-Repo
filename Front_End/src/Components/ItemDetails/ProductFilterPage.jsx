import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "./ProductList";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Slider,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { getProducts as listProducts } from "../../redux/actions/productActions";

const ProductFilterPage = () => {
  const dispatch = useDispatch();
  const getProducts = useSelector((state) => state.getProducts);
  const { products } = getProducts;

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterOptions, setFilterOptions] = useState({
    price: [0, 5000], // Initial price range
    discount: "",
  });
  const [sortOption, setSortOption] = useState(""); // Initial sort option

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    applyFilters();
  }, [filterOptions, products, sortOption]);

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by price range
    filtered = filtered.filter((product) => {
      const price = parseFloat(product.price.cost);
      return price >= filterOptions.price[0] && price <= filterOptions.price[1];
    });

    // Filter by discount
    if (filterOptions.discount) {
      filtered = filtered.filter(
        (product) =>
          parseFloat(product.price.discount.replace("%", "")) >=
          parseFloat(filterOptions.discount)
      );
    }

    // Sort filtered products
    if (sortOption === "price") {
      filtered.sort(
        (a, b) => parseFloat(a.price.cost) - parseFloat(b.price.cost)
      );
    } else if (sortOption === "title") {
      filtered.sort((a, b) =>
        a.title.longTitle.localeCompare(b.title.longTitle)
      );
    }

    setFilteredProducts(filtered);
  };

  const handlePriceChange = (event, newValue) => {
    setFilterOptions({
      ...filterOptions,
      price: newValue,
    });
  };

  const handleChange = (event) => {
    setFilterOptions({
      ...filterOptions,
      [event.target.name]: event.target.value,
    });
  };

  const handleReset = () => {
    setFilterOptions({
      price: [0, 5000],
      discount: "",
    });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div
      style={{ position: "relative",  right: "0", padding: "10px" }}
    >
      <div style={{ width: "200px" }}>
        <FormControl fullWidth>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="title">Title</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={2}>
        {/* Filter options as a card on the left */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <h2>Filter Options</h2>
              <div style={{ marginBottom: 16 }}>
                <Typography variant="subtitle1">
                  Price Range: ${filterOptions.price[0]} - $
                  {filterOptions.price[1]}
                </Typography>
                <Slider
                  value={filterOptions.price}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5000}
                  step={50}
                  color="secondary"
                />
              </div>
              <FormControl fullWidth style={{ marginBottom: 16 }}>
                <InputLabel id="discount-label">Discount (Min)</InputLabel>
                <Select
                  labelId="discount-label"
                  id="discount"
                  name="discount"
                  value={filterOptions.discount}
                  onChange={handleChange}
                  style={{ backgroundColor: "#E8F5E9" }}
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value={30}>30% or more</MenuItem>
                  <MenuItem value={40}>40% or more</MenuItem>
                  <MenuItem value={50}>50% or more</MenuItem>
                  {/* Add more discount options as needed */}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="price-label">Price</InputLabel>
                <Select
                  labelId="price-label"
                  id="price"
                  name="price"
                  value={filterOptions.price[1]}
                  onChange={handleChange}
                  style={{ backgroundColor: "#E8F5E9" }}
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value={500}>$500 or less</MenuItem>
                  <MenuItem value={1000}>$1000 or less</MenuItem>
                  <MenuItem value={1500}>$1500 or less</MenuItem>
                  {/* Add more price options as needed */}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                onClick={handleReset}
                style={{
                  backgroundColor: "#81C784",
                  color: "#ffffff",
                  marginTop: "16px",
                }}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </Grid>
        {/* Product list on the right */}
        <Grid item xs={12} md={9}>
          <ProductList products={filteredProducts} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductFilterPage;
