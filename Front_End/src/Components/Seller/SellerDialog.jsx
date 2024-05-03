import React, { useState } from 'react';

import { Dialog, DialogContent, TextField, Box, Button, Typography, styled } from '@mui/material';

import { sellProduct} from '../../service/api';

const Component = styled(DialogContent)`
    height: 90vh;
    width: 120vh;
    padding: 0;
    padding-top: 0;
`;

const SellButton = styled(Button)`
    text-transform: none;
    background: #db123a;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;





const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;


// height: 70vh;
   // https://img.freepik.com/free-vector/white-convertible-car-isolated-white-vector_53876-66815.jpg 
   //https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png
const Image = styled(Box)`
    background: #478526 center 80% no-repeat;
    width: 50%;
    height: 100%;
    padding: 45px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600
    }
`;


const productInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
};



const SellerDialog = ({ open, setOpen }) => {
    const [ product, setProduct ] = useState(productInitialValues);
   
    const onInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

 
    const sendproduct = async() => {
        let response = await sellProduct(product);
        if(!response) return;
        handleClose();
        
    }

    const handleClose = () => {
        setOpen(false);
       
    }

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { maxWidth: 'unset' } }} >
            <Component>
                <Box style={{display: 'flex', height: '100%'}}>
                    <Image>
                        <Typography variant="h5">Sell A Product</Typography>
                        <Typography style={{marginTop: 20}}>Sell a product and list it on the site.</Typography>
                    </Image>
                    {
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='productname' label='Enter Product Name' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='description' label='Enter Product description' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='price' label='Enter Price' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email1' label='Enter Email' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password1' label='Enter Password' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='phone1' label='Enter Phone' />
                            <SellButton onClick={() => sendproduct()} >Continue</SellButton>
                        </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog>
    )
}

export default SellerDialog;