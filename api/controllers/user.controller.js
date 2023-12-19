import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js'; // Assuming error handling utilities are in 'error.js'
import User from '../models/user.model.js';

export const test = (req, res) => {
    res.json({
        message: 'Api route is working',
    });
};

export const updateUser = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return next(errorHandler(401, "You can only update your own account!"));
        }

        let updateFields = {};
        
        if (req.body.username) {
            updateFields.username = req.body.username;
        }
        if (req.body.email) {
            updateFields.email = req.body.email;
        }
        if (req.body.avatar) {
            updateFields.avatar = req.body.avatar;
        }
        if (req.body.password) {
            updateFields.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedUser) {
            return next(errorHandler(404, "User not found"));
        }

        // Destructure to remove sensitive data like password before sending the response
        const { password, ...rest } = updatedUser.toObject(); // Use toObject() to get a plain object
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
