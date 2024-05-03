import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const LoginContext = createContext(null);
const url = 'http://localhost:8000';

const ContextProvider = ({children}) => {

    const [ account, setAccount ] = useState('');
    const [userData, setUserData] = useState(null); // State to store user data fetched from MongoDB

    useEffect(() => {
        // Fetch user data when the account changes
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${url}/apple/${account}`);
                setUserData(response.data);
                console.log('User data:', response.data );
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (account) {
            fetchUserData();
        }
    }, [account]);

    // Function to update user information
    const updateUserInfo = async (updatedInfo) => {
        try {
            const response = await axios.put(`${url}/api/user/${account}`, updatedInfo);
            setUserData(response.data); // Update user data in state
        } catch (error) {
            console.error('Error updating user information:', error);
        }
    };
    
    return (
        <LoginContext.Provider value={{ account, setAccount, userData, updateUserInfo }}>
            {children}
        </LoginContext.Provider>
    )
}

export default ContextProvider;