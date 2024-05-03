import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import axios from 'axios';

const url = "http://localhost:8000";

const PieChart = () => {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    // Fetch products data from backend
    axios.get(`${url}/products`)
      .then(response => {
        setProductsData(response.data);
        // console.log('Products data:', response.data);
      })
      .catch(error => {
        console.error('Error fetching products data:', error);
      });
  }, []);

  // Prepare data for pie chart
  const chartData = productsData.map(product => ({
    id: product.id, // Seller as id
    value: product.price.cost // Cost as value
  }));

console.log('chartData:', chartData);
  return (
    <ResponsivePie
      data={chartData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#fff" // Use white color for arc link labels
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
