import { useState, useEffect } from 'react';

import { Box, Typography, styled } from '@mui/material';
import GroupButton from './GroupButton';

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    borderBottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
    color: #878787;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
    }
`;

const Price = styled(Typography)`
    float: right;
`;

const TotalAmount = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    border-top: 1px dashed #e0e0e0;
    padding: 20px 0;
    border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled(Typography)`
    font-size: 16px; 
    color: green;
`

// component: {
//     // width: '30%'
// },


const TotalView = ({ cartItems, counter, setCounter }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    

    useEffect(() => {
        const totalAmount = () => {
            let price = 0, discount = 0;
            cartItems.forEach(item => {
                price += item.price.mrp*counter
                discount += (item.price.mrp - item.price.cost)*counter 
            })
            setPrice(price);
            setDiscount(discount);
        };
        totalAmount();
    }, [cartItems]);
    
    

    return (
        <Box>  {/* className={classes.component}> */}
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography>Price ({cartItems?.length} item)
                    <Price component="span">${price*counter}</Price>
                </Typography>
                <Typography>Discount
                    <Price component="span">-${discount*counter}</Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component="span">$30</Price>
                </Typography>
                <TotalAmount>Total Amount
                    <Price>${price*counter - discount*counter + 30}</Price>
                </TotalAmount>
                <Discount>You will save ${discount*counter - 30} on this order</Discount>
            </Container>
           
        </Box>
    )
}

export default TotalView;