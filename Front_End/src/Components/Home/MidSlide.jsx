
import { Box, styled } from '@mui/material';

import Slide from './Slide';

const Component = styled(Box)`
    display: flex;
`

const LeftComponent = styled(Box)(({ theme}) => ({
    width: '83%',
    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}))

const RightComponent = styled(Box)(({ theme}) => ({
    marginTop: 10,
    background: '#FFFFFF',
    width: '17%',
    height:"100%",
    marginLeft: 10,
    padding: 5,
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const MidSlide = ({ products }) => {
    //const adURL = 'https://rukminim1.flixcart.com/flap/464/708/image/633789f7def60050.jpg?q=70';
    const adURL = 'https://cdn.create.vista.com/downloads/73f1b298-b3bb-4fb0-98ff-ff07542b8ef1_1024.jpeg';

    return (
        <Component>
            <LeftComponent>
                <Slide 
                    data={products} 
                    title='Deals of the Day'
                    timer={true} 
                    multi={true} 
                />
            </LeftComponent>
            <RightComponent>
                <img src={adURL} alt="" style={{width: 210,height:350}}/>
            </RightComponent>
        </Component>
    )
}

export default MidSlide;