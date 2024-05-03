import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
//import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
//import DialogTitle from '@mui/material/DialogTitle';
import {  TextField, Box, Typography, styled } from '@mui/material';
import { sellProduct} from '../../service/api';


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
const Component = styled(DialogContent)`
    height: 90vh;
    width: 120vh;
    padding: 0;
    padding-top: 0;
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

const SellButton = styled(Button)`
    text-transform: none;
    background: #db123a;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;
const productInitialValues = {
        id: 'productx',
        url: 'https://cld.partsimg.com/image/upload/d_noimage.jpg,h_112,c_pad,f_auto,q_auto,dpr_auto,e_sharpen/images/corner_lights_-and-_components.jpg', 
        detailUrl: 'https://cld.partsimg.com/image/upload/d_noimage.jpg,h_112,c_pad,f_auto,q_auto,dpr_auto,e_sharpen/images/corner_lights_-and-_components.jpg',
        title: {
            shortTitle: '',
            longTitle: ''
        }, 
        price: {
            mrp: 50,
            cost: 70,
            discount: '30%'
        },
        quantity: 0,
        description: '',
        discount: 'Extra 10% Off', 
        tagline: 'Deal of the day' 
};



export default function AlertDialog() {
    const [open, setOpen] = React.useState(false);
    const [ product, setProduct ] = React.useState(productInitialValues);
   
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const onInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    }

 
    const sendproduct = async() => {
        let response = await sellProduct(product);
        if(!response) return;
        handleClose();
        
    }
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setProduct({ ...product, url: base64 });
        setProduct({ ...product, detailUrl: base64 });
      };
  
    return (
      <React.Fragment>
        <SellerButton variant="contained" onClick={handleClickOpen}>
          BecomeSeller
        </SellerButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{ sx: { maxWidth: 'unset' } }}
        >
           <Component>
                <Box style={{display: 'flex', height: '100%'}}>
                    <Image>
                        <Typography variant="h5">Sell A Product</Typography>
                        <Typography style={{marginTop: 20}}>Sell a product and list it on the site.</Typography>
                    </Image>
                    {
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='shortTitle' label='Enter Short Product Name' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='longTitle' label='Enter Long Product Name' />
                           
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='description' label='Enter Product description' />
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='quantity' label='Enter no of items' />
                          
                            <TextField variant="standard" onChange={(e) => onInputChange(e)} name='mrp' label='Enter Price' />
                            <br></br>
                            <Button
  variant="contained"
  component="label"
>      <input
          type="file"
          label="Image"
          name="url"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />
        </Button>

                            <SellButton onClick={() => sendproduct()} >Sell It Now </SellButton>
                        </Wrapper>
                    }
                </Box>
            </Component>
        </Dialog>
      </React.Fragment>
    );
  }