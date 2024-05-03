// import { useTheme } from "@mui/material";
// import { tokens } from "../theme";
// import { mockBarData as data } from "../data/mockData";
import axios from "axios";
import { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";

const url = "http://localhost:8000";

const BarChart = ({ isDashboard = false }) => {
  // const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const [productsData, setProductsData] = useState([]);

    useEffect(() => {
        // Fetch products data from backend
        axios.get(`${url}/products`)
            .then(response => {
                setProductsData(response.data);
                console.log('Products data:', response.data);
            })
            .catch(error => {
                console.error('Error fetching products data:', error);
            });

           
    }, []);
    const chartData = [
      {
          id: 'Prices',
          data: productsData.map(product => ({
              x: product.seller, // Use product title as x-axis
              y: product.price.cost // Use product cost as y-axis
          }))
      }
  ];
  return (
    <ResponsiveLine
    data={chartData}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
    yFormat=" >-.2f"
    axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Sellers',
        legendOffset: 36,
        legendPosition: 'middle'
    }}
    axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Prices',
        legendOffset: -40,
        legendPosition: 'middle'
    }}
    enableGridX={false}
    enableGridY={true}
    curve="linear"
    lineWidth={3}
    enablePoints={false}
    colors={{ scheme: 'category10' }} // You can change the color scheme
/>
  );
};

export default BarChart;
