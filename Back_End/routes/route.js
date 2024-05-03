import express from  'express';
import { getProductById, getProducts } from '../controller/product-controller.js';
import { userSignUp, userLogIn } from '../controller/user-controller.js';
import { updateUserDetails } from '../controller/user-controller.js'; // Import the controller function
import { getUserByUsername } from '../controller/user-controller.js';
// import { addItemInCart } from '../controller/cart-controller.js';
// import { addPaymentGateway, paymentResponse } from '../controller/payment-controller.js';
import { sellProduct } from '../controller/sample-controller.js';
import { getOrdersByUser } from '../controller/order-controller.js';
import { get } from 'https';
import { getProductsBySeller } from '../controller/product-controller.js';
import { getOrderCount } from '../controller/order-controller.js';
import { getProductsCount } from '../controller/product-controller.js';
import { getUsersCount } from '../controller/user-controller.js';
import { getOrders } from '../controller/order-controller.js';
import { getUsers } from '../controller/user-controller.js';
// Import the fetch library

const router = express.Router();

//login & signup
router.post('/signup', userSignUp);
router.post('/login', userLogIn);

//sample
router.post('/sellproduct',sellProduct)
router.put('/api/user/:username', updateUserDetails);

router.get('/api/orders/:username', getOrdersByUser);
router.get('/products/list/:seller', getProductsBySeller);

router.get('/apple/:username', getUserByUsername);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);

router.get('/orders/count', getOrderCount);
router.get('/products/count', getProductsCount);
router.get('/users/count', getUsersCount);
router.get('/orders', getOrders);
router.get('/users', getUsers);

router.get('/yelp-reviews/:location', async (req, res) => {
    try {
      const location = req.params.location;
      const options = {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer xMpF95ohL8a_SFYlvsr25CG3mN0BuxjHPFY-yquqmhfzZ7eJPyRgFwGqN6sYzPIf7WoSckd3eKjVWC2RCHAQUcry8mI1ldP3z9BGSempFUd6aolgof0tM1mEpn4CZXYx'
        }
      };
  
      const businessesResponse = await fetch(`https://api.yelp.com/v3/businesses/search?location=${location}&term=Dollar%20General&sort_by=best_match&limit=20`, options);
  
      if (!businessesResponse.ok) {
        throw new Error('Failed to fetch businesses from Yelp API');
      }
  
      const businessesData = await businessesResponse.json();
      if (businessesData && businessesData.businesses && businessesData.businesses.length > 0) {
        const { id } = businessesData.businesses[0];
        const reviewsResponse = await fetch(`https://api.yelp.com/v3/businesses/${id}/reviews`, options);
        if (!reviewsResponse.ok) {
          throw new Error('Failed to fetch reviews from Yelp API');
        }
        const reviewsData = await reviewsResponse.json();
        res.json(reviewsData.reviews);
      } else {
        res.status(404).json({ error: 'Business not found' });
      }
    } catch (error) {
      console.error('Error fetching Yelp reviews:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// router.post('/cart/add', addItemInCart);

// router.post('/payment', addPaymentGateway);
// router.post('/callback', paymentResponse);

export default router;