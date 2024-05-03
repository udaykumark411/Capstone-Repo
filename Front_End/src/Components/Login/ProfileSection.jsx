import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Modal,
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios"; // Import axios for HTTP requests
import { LoginContext } from "../../context/ContextProvider";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const url = "http://localhost:8000";

const ProfileSection = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [openOrdersModal, setOpenOrdersModal] = useState(false);

  const handleOpenOrdersModal = () => {
    setOpenOrdersModal(true);
  };

  const handleCloseOrdersModal = () => {
    setOpenOrdersModal(false);
  };
  const [orders, setOrders] = useState([]);
  const { account } = useContext(LoginContext);
  console.log("Account:", account);

  useEffect(() => {
    // Fetch user details from MongoDB when component mounts
    axios
      .get(`${url}/apple/${account}`)
      .then((response) => {
        // Set the initial state of editedDetails with user data
        setEditedDetails({
          firstName: response.data.firstname,
          lastName: response.data.lastname,
          email: response.data.email,
          password: "", // Set password to empty string or remove it if you don't want to show it
        });
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });

    // Fetch user orders from MongoDB when component mounts
    axios
      .get(`${url}/api/orders/${account}`)
      .then((response) => {
        // Check if response data is an array
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          console.error("Invalid response format for orders:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user orders:", error);
      });
  }, [account]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    setEditedDetails({
      ...editedDetails,
      [e.target.name]: e.target.value,
    });
  };
  const faqs = [
    {
        question: "What is Reduced Price Market?",
        answer: "Reduced Price Market is an online marketplace where you can find discounted products from various categories."
    },
    {
        question: "How do I buy products from Reduced Price Market?",
        answer: "You can browse through the available products, add them to your cart, and proceed to checkout. Follow the instructions to complete your purchase."
    },
    {
        question: "Are the products on Reduced Price Market brand new?",
        answer: "Most of the products on Reduced Price Market are brand new, but there may also be refurbished or pre-owned items available at a discounted price."
    },
    {
        question: "How can I contact customer support?",
        answer: "You can reach our customer support team through email at support@reducedpricemarket.com or by calling our helpline at 1-800-123-4567."
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept various payment methods including credit/debit cards, PayPal, and online banking. You can choose the one that suits you best during checkout."
    },
    {
        question: "Is there a return policy?",
        answer: "Yes, we have a return policy that allows you to return products within 30 days of purchase if you are not satisfied with them. Please refer to our Returns & Refunds page for more details."
    }
];
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };
  const [showFAQ, setShowFAQ] = useState(false);

  const handleShowFAQ = () => {
    setShowFAQ(!showFAQ);
    setExpanded(!expanded);
  };

  const handleSaveChanges = () => {
    // Send HTTP request to update user details in MongoDB
    axios
      .put(`${url}/api/user/${account}`, editedDetails)
      .then((response) => {
        // Handle success
        console.log("User details updated successfully:", response.data);
        // Optionally, close the modal after saving changes
        handleCloseModal();
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating user details:", error);
      });
  };

  return (
    <>
      <Grid container spacing={3} style={{ marginTop: "65px" }}>
        <Grid item xs={6} sm={3}>
          <Card onClick={handleOpenModal}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Personal Information
              </Typography>
              <Typography color="textSecondary">
                View and edit your personal details
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card onClick={handleOpenOrdersModal}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Orders
              </Typography>
              <Typography color="textSecondary">
                View your recent orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card onClick={handleShowFAQ}>
            <CardContent>
              <Typography variant="h5" component="h2">
                FAQ
              </Typography>
              <Typography color="textSecondary">
                View frequently asked questions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Add other cards here */}
      </Grid>
      {showFAQ && (
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Accordion expanded={expanded}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq-content"
              id="faq-header"
            >
              <Typography variant="h6">Frequently Asked Questions</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {faqs.map((faq, index) => (
                  <Grid item xs={12} key={index}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`faq-${index}-content`}
                        id={`faq-${index}-header`}
                      >
                        <Typography variant="subtitle1">
                          {faq.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{faq.answer}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      )}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="edit-profile-modal"
        aria-describedby="edit-profile-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Profile
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="firstName"
            value={editedDetails.firstName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="lastName"
            value={editedDetails.lastName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={editedDetails.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={editedDetails.password}
            onChange={handleChange}
          />
          <Button
            onClick={handleSaveChanges}
            variant="contained"
            color="primary"
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
      <Modal
        open={openOrdersModal}
        onClose={handleCloseOrdersModal}
        aria-labelledby="view-orders-modal"
        aria-describedby="view-orders-details"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your Orders
          </Typography>
          <List>
            {orders.map((order) => (
              <ListItem key={order._id}>
                <ListItemText primary={`Order ID: ${order._id}`} />
                <ListItemText primary={`Total Amount: ${order.price}`} />
                <ListItemText primary={`Ordered on: ${order.date}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileSection;
