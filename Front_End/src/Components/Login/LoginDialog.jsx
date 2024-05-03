import React, { useState, useEffect } from "react";

import {
  Dialog,
  DialogContent,
  TextField,
  Box,
  Button,
  Typography,
  styled,
} from "@mui/material";

import { authenticateLogin, authenticateSignup } from "../../service/api";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

const Component = styled(DialogContent)`
  height: 70vh;
  width: 90vh;
  padding: 0;
  padding-top: 0;
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #db123a;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const RequestOTP = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const CreateAccount = styled(Typography)`
  margin: auto 0 5px 0;
  text-align: center;
  color: #2874f0;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
`;

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;
// height: 70vh;
// https://img.freepik.com/free-vector/white-convertible-car-isolated-white-vector_53876-66815.jpg
//https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png
const Image = styled(Box)`
  background: #478526 center 80% no-repeat;
  width: 50%;
  height: 100%;
  padding: 45px 35px;
  & > p,
  & > h5 {
    color: #ffffff;
    font-weight: 600;
  }
`;

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};

const accountInitialValues = {
  login: {
    view: "login",
    heading: "Login",
    subHeading: "Get access to your Orders, Wishlist and Recommendations",
  },
  signup: {
    view: "signup",
    heading: "Looks like you're new here",
    subHeading: "Signup to get started",
  },
};

const LoginDialog = ({ open, setOpen, setAccount }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState(false);
  const [account, toggleAccount] = useState(accountInitialValues.login);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  useEffect(() => {
    showError(false);
  }, [login]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response = await authenticateLogin(login);
    if (!response) {
      showError(true);
    } else {
      showError(false);
      handleClose();
      setAccount(login.username);
      setOpenSnackbar(true); // Open the Snackbar
    }
  };

  const signupUser = async () => {
    let response = await authenticateSignup(signup);
    if (!response) return;
    handleClose();
    setAccount(signup.username);
  };

  const toggleSignup = () => {
    toggleAccount(accountInitialValues.signup);
  };

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialValues.login);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { maxWidth: "unset" } }}
      >
        <Component>
          <Box style={{ display: "flex", height: "100%" }}>
            <Image>
              <Typography variant="h5">{account.heading}</Typography>
              <Typography style={{ marginTop: 20 }}>
                {account.subHeading}
              </Typography>
            </Image>
            {account.view === "login" ? (
              <Wrapper>
                <TextField
                  variant="standard"
                  onChange={(e) => onValueChange(e)}
                  name="username"
                  label="Enter Email/Mobile number"
                />
                {error && (
                  <Error>Please enter valid Email ID/Mobile number</Error>
                )}
                <TextField
                  variant="standard"
                  onChange={(e) => onValueChange(e)}
                  name="password"
                  label="Enter Password"
                  type="password"
                />
                <Text>
                  By continuing, you agree to Don't Junk It List It Terms of Use
                  and Privacy Policy.
                </Text>
                <LoginButton onClick={() => loginUser()}>Login</LoginButton>
                <Text style={{ textAlign: "center" }}>OR</Text>
                <RequestOTP>Request OTP</RequestOTP>
                <CreateAccount onClick={() => toggleSignup()}>
                  New to Site? Create an account
                </CreateAccount>
              </Wrapper>
            ) : (
              <Wrapper>
                <TextField
                  variant="standard"
                  onChange={(e) => onInputChange(e)}
                  name="firstname"
                  label="Enter Firstname"
                />
                <TextField
                  variant="standard"
                  onChange={(e) => onInputChange(e)}
                  name="lastname"
                  label="Enter Lastname"
                />
                <TextField
                  variant="standard"
                  onChange={(e) => onInputChange(e)}
                  name="username"
                  label="Enter Username"
                />
                <TextField
                  variant="standard"
                  onChange={(e) => onInputChange(e)}
                  name="email"
                  label="Enter Email"
                />
                <TextField
                  variant="standard"
                  onChange={(e) => onInputChange(e)}
                  name="password"
                  label="Enter Password"
                  type="password"
                />
                <TextField
                  variant="standard"
                  onChange={(e) => onInputChange(e)}
                  name="phone"
                  label="Enter Phone"
                />
                <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
              </Wrapper>
            )}
          </Box>
        </Component>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Logged in successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginDialog;
