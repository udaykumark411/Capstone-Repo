import {  Grid, styled } from '@mui/material';

const ImageURL = [
    'https://rukminim2.flixcart.com/flap/500/500/image/7245c5bc2a7c3dcb.jpg?q=50',
    'https://rukminim2.flixcart.com/flap/500/500/image/7245c5bc2a7c3dcb.jpg?q=50',
    'https://rukminim2.flixcart.com/flap/500/500/image/7245c5bc2a7c3dcb.jpg?q=50'
];

const Wrapper = styled(Grid)`
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
`;

const Image = styled('img')(({ theme }) => ({ 
    display: 'flex',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        objectFit: 'cover',
        height: 120
    }
}));

const MidSection = () => {
   // const url = 'https://rukminim1.flixcart.com/flap/3006/433/image/4789bc3aefd54494.jpg?q=50';
    const url = 'https://www.mobilityworks.com/wp-content/uploads/Flex-Lease-Patriot-2023-399-1200-x-450-1.jpg';
   return (
        <>
            <Wrapper lg={12} sm={12} md={12} xs={12} container>
                {
                    ImageURL.map(image => (
                        <Grid item lg={4} md={4} sm={12} xs={12}>
                            <img src={image} alt="" style={{ width: '100%' }} />
                        </Grid>
                    ))
                }
            </Wrapper>
            <Image src={url} style={{height:'370px'}}/>
        </>
    )
}

export default MidSection;