import { useState } from 'react';

import { AppBar, Toolbar, Box, Typography, IconButton, Drawer, List, styled } from '@mui/material';
import { Menu } from '@mui/icons-material';

import { Link } from 'react-router-dom';

//components
import CustomButtons from './CustomButtons';
import Search from './Search';

const StyledHeader = styled(AppBar)`
    background: #478526;
    height: 55px;
`;

const Component = styled(Link)`
    margin-right: 5%;
    line-height: 0;
    color: #FFFFFF;
    text-decoration: none;
    align-items: center;
`;

const SubHeading = styled(Typography)`
    font-size: 10px;
`

// const PlusImage = styled('img')({
//     width: 10,
//     height: 10,
//     marginLeft: 4
// })

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const CustomButtonWrapper = styled('span')(({ theme }) => ({ 
    margin: '0 5% 0 auto', 
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));

const Header = () => {
    const logoURL = 'https://cdn-icons-png.flaticon.com/512/3724/3724788.png';
    // const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const list = () => (
        <Box style={{ width: 250 }} onClick={handleClose}>
            <List>
                <listItem button>
                    <CustomButtons />
                </listItem>
            </List>
        </Box>
    );


    return (
        <StyledHeader position="fixed">
            <Toolbar style={{ minHeight: 55 }}>
                <MenuButton
                    color="inherit"
                    onClick={handleOpen}
                >
                    <Menu />
                </MenuButton>

                <Drawer open={open} onClose={handleClose}>
                    {list()}
                </Drawer>
                
                <Component to='/'>
                    
                    <Box component="span" style={{ display:'flex' }}>
                    <img src={logoURL} alt='Logo' style={{ width: 40 , height:40}} />
                    
                    <Typography style={{ fontWeight: 500 }}>
                        Reduced Price Market
                        </Typography>  
                        
                        
                    </Box>
                    
                </Component>
                <Search />
                <CustomButtonWrapper>
                    <CustomButtons />
                </CustomButtonWrapper>
            </Toolbar>
        </StyledHeader>
    )
}

export default Header;