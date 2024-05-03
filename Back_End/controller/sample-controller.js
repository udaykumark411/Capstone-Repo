import Sample from "../model/sampleSchema.js";

import products from "../model/productSchema.js";

export const sellProduct = async (request, response) => {
    try {
        const exist = await products.findOne({ id: request.body.id });
        // if(exist) {
        //     return response.status(401).json({ message: 'Product already exist'});
        // }
        const user = request.body;
        user["title"]["shortTitle"] = user["shortTitle"];
        user["title"]["longTitle"] = user["longTitle"];
        user["url"] = user["detailUrl"];
        user["price"]["mrp"] = user["mrp"];
        user["price"]["cost"] = user["mrp"];
        user["price"]["discount"] = '0%';
        delete user['mrp'];
        delete user["longTitle"];
        delete user["shortTitle"];
        // console.log(user);
        const newUser = new products(user);
        await newUser.save();
        response.status(200).json({ mesage: user });
        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}