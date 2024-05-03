import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  styled,
} from "@mui/material";
import { LocalOffer as Badge } from "@mui/icons-material";
import React, { useState} from "react";
import Button from "@mui/material/Button";
import MapModal from "./MapModal";

const SmallText = styled(Box)`
  font-size: 14px;
  vertical-align: baseline;
  & > p {
    font-size: 14px;
    margin-top: 10px;
  }
`;

const ColumnText = styled(TableRow)`
  font-size: 14px;
  vertical-align: baseline;
  & > td {
    font-size: 14px;
    margin-top: 10px;
  }
`;

const StyledBadge = styled(Badge)`
  margin-right: 10px;
  color: #00cc00;
  font-size: 15px;
`;

const ProductDetail = ({ product }) => {
  // const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
  const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);
  const [openMapModal, setOpenMapModal] = useState(false);

  const handleOpenMapModal = () => {
      setOpenMapModal(true);
      getUserLocation();

  };

  const handleCloseMapModal = () => {
      setOpenMapModal(false);
  };
  const [userLocation, setUserLocation] = useState(null);
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
          alert('Error getting user location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <>
      <Typography>Available offers</Typography>
      <SmallText>
        <Typography>
          <StyledBadge />
          Bank Offer 5% Unlimited Cashback on American Express Credit Card
        </Typography>
        <Typography>
          <StyledBadge />
          Bank Offer 10% Off on TD bank debit card first time transaction, Terms
          and Condition apply
        </Typography>
        <Typography>
          <StyledBadge />
          Purchase this spare part and Get Extra $20 Off on Select wheels
        </Typography>
        <Typography>
          <StyledBadge />
          Partner OfferExtra 10% off upto $25 on next Oil Purchase
        </Typography>
      </SmallText>
      <Table>
        <TableBody>
          <ColumnText>
            <TableCell style={{ color: "#878787" }}>Delivery</TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Delivery by {date.toDateString()} | $30
            </TableCell>
          </ColumnText>
          <ColumnText>
            <TableCell style={{ color: "#878787" }}>Warranty</TableCell>
            <TableCell>No Warranty</TableCell>
          </ColumnText>
          <ColumnText>
            <TableCell style={{ color: "#878787" }}>Seller</TableCell>
            <TableCell>
              <span style={{ color: "#2874f0" }}>{product.seller}</span>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenMapModal}
              >
                View Map & Reviews
              </Button>
              <Typography>View more sellers starting from $32</Typography>
              {openMapModal && <MapModal open={openMapModal} onClose={handleCloseMapModal} userLocation={userLocation} seller={product.seller}/>
}

            </TableCell>
          </ColumnText>

          <ColumnText>
            <TableCell style={{ color: "#878787" }}>Description</TableCell>
            <TableCell>{product.description}</TableCell>
          </ColumnText>
        </TableBody>
      </Table>
    </>
  );
};

export default ProductDetail;
