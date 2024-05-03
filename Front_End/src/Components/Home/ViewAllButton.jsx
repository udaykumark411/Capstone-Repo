import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ViewAllButton = () => {
    const navigate = useNavigate();

    const handleViewAllClick = () => {
        navigate('/productfilter');
    };

    return (
        <Button 
            variant="contained" 
            color="primary" 
            onClick={handleViewAllClick} 
            style={{
                marginLeft: 'auto',
                marginRight: '0',
                backgroundColor: '#478526',
                borderRadius: '2px',
                fontSize: '13px'
            }}
        >
            View All
        </Button>
    );
};

export default ViewAllButton;