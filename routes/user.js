const router = require('express').Router();
const User = require('../models/User');
const Review = require('../models/Review');
const ErrorResponse = require('../utils/error');
const { isAuthenticated } = require('../middlewares/jwt')

// @desc    Edit User
// @route   PUT /api/v1/
// @access  Public
router.put('/', isAuthenticated, async (req, res, next) => {
    const userId = req.payload._id;
    const { email, hashedPassword, username } = req.body;
    try {
        const user = await User.findById(userId);
        if(!user) {
          return next(new ErrorResponse(`User not found by ${userId}`, 404));
        } else {
            const updatedUser = await User.findByIdAndUpdate(userId, { email, hashedPassword, username }, {new: true});
            res.status(202).json({ data: updatedUser })
        }
      } catch (error) {
        next(error);
    }
});

// @desc    Delete User
// @route   DELETE /api/v1/
// @access  Public
router.delete('/', isAuthenticated, async (req, res, next) => {
    const userId = req.payload._id;
    try {
        const user = await User.findById(userId);
        if(!user) {
          return next(new ErrorResponse(`User not found by ${userId}`, 404));
        } else {
            const deletedReview = await Review.deleteMany({userId});
            const deletedUser = await User.findByIdAndDelete(userId);
            res.status(202)
        }
      } catch (error) {
        next(error);
    }
});

module.exports = router;
