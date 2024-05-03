import User from '../model/userSchema.js';

export const userLogIn = async (request, response) => {
    try {
        let user = await User.findOne({ username: request.body.username, password: request.body.password });
        if(user) {
            return response.status(200).json(`${request.body.username} login successfull`);
        } else {
            return response.status(401).json('Invalid Login');
        }

    } catch (error) {
        response.json('Error: ', error.message);        
    }
}

export const userSignUp = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if(exist) {
            return response.status(401).json({ message: 'User already exist'});
        }
        const user = request.body;
        const newUser = new User(user);
        await newUser.save();
        response.status(200).json({ mesage: user });
        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}


export const updateUserDetails = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    console.log('Request body:', req.body);
    try {
        // Find the user by email and update their details
        console.log(firstname, lastname, password);
        const updatedUser = await User.findOneAndUpdate(
            { username: req.params.username }, // Assuming email is unique
            { $set: {
                firstname: req.body.firstName,
                
                email: req.body.email,
                password: req.body.password,
                lastname: req.body.lastName,
                
            } }, // Only update provided fields
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ error: 'An error occurred while updating user details' });
    }
};

export const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.params;
        console.log('Username:', username );
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        return res.status(500).json({ error: 'An error occurred while fetching user data' });
    }
};

export const getUsersCount = async (request, response) => {
    try {
        const users = await User.countDocuments();
        response.json({users});
    } catch (error) {
        console.error('Error fetching orders:', error);
        response.status(500).json({ error: 'An error occurred while fetching orders' });
    }
}
export const getUsers = async (request, response) => {
    try {
        const users = await User.find({});

        response.json(users);
    }catch (error) {

    }
}