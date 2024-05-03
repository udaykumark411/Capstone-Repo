import React from 'react';
import { Typography, Container } from '@mui/material';

const Footer = () => {
    return (
        <Container component="footer" maxWidth="md" style={{ marginTop: '50px', marginBottom: '20px',textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
                &copy; {new Date().getFullYear()} Reduced Price Market. All rights reserved.
            </Typography>
        </Container>
    );
};

export default Footer;