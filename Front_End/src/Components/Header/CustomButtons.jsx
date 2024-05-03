import React, { useState, useContext } from "react";

import { Box, Typography, Badge, Button, styled } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { LoginContext } from "../../context/ContextProvider";
import { useSelector } from "react-redux";

import Profile from "./Profile";
import LoginDialog from "../Login/LoginDialog";
// import SellerDialog from '../Seller/SellerDialog';
import AlertDialog from "../Seller/AlertDialog";


const SellerButton = styled(Button)(({ theme }) => ({
    
  color: '#800000',
  background: '#FFFFFA',
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 2,
  padding: '5px 40px',
  height: 32,
  boxShadow: 'none',
  [theme.breakpoints.down('sm')]: {
      background: '#FFFFFF',
      color: '#800000'
  }
}));

const Container = styled(Link)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const Wrapper = styled(Box)(({ theme }) => ({
  margin: "0 3% 0 auto",
  display: "flex",
  "& > *": {
    marginRight: "40px !important",
    textDecoration: "none",
    color: "#FFFFFF",
    fontSize: 12,
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      color: "#800000",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      marginTop: 10,
    },
  },
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  color: "#800000",
  background: "#FFFFFF",
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 2,
  padding: "5px 40px",
  height: 32,
  boxShadow: "none",
  [theme.breakpoints.down("sm")]: {
    background: "#FFFFFF",
    color: "#800000",
  },
}));

const CustomButtons = () => {
  const [open, setOpen] = useState(false);


  const { account, setAccount } = useContext(LoginContext);
  
  const handleClickOpen = () => {
    navigate('/become-seller');
  };

  const cartDetails = useSelector((state) => state.cart);
  const { cartItems } = cartDetails;
  const navigate = useNavigate();

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <Wrapper>
      {account ? (
        <>
          <Profile account={account} setAccount={setAccount} />
          {/* <AlertDialog></AlertDialog> */}
          <SellerButton variant="contained" onClick={handleClickOpen}>
          BecomeSeller
        </SellerButton>

          <Typography
            style={{ marginTop: 3 }}
            onClick={() => navigate("/profilesection")}
          >
            More
          </Typography>
        </>
      ) : (
        <LoginButton variant="contained" onClick={() => openDialog()}>
          Login
        </LoginButton>
      )}
      {/* <SellerButton variant="outlined" onClick={()=>openSellDialog()}>BecomeSeller</SellerButton>  */}

      <Container to="/cart">
        <Badge badgeContent={cartItems?.length} color="primary">
          <ShoppingCart />
        </Badge>
        <Typography style={{ marginLeft: 10 }}>Cart</Typography>
      </Container>

      <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
    </Wrapper>
  );
};

export default CustomButtons;
