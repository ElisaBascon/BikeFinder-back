const router = require('express').Router();
const User = require('../models/User');
const ErrorResponse = require('../utils/error');

// @desc    Edit User
// @route   PUT /api/v1/
// @access  Public
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { email, hashedPassword, username } = req.body;
    try {
        const user = await User.findById(id);
        if(!user) {
          next(new ErrorResponse(`User not found by ${id}`, 404));
        } else {
            const updatedUser = await User.findByIdAndUpdate(id, { email, hashedPassword, username }, {new: true});
            res.status(202).json({ data: updatedUser })
        }
      } catch (error) {
        next(error);
    }
});

// @desc    Delete User
// @route   DELETE /api/v1/
// @access  Public
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const review = await User.findById(id);
        if(!user) {
          next(new ErrorResponse(`User not found by ${id}`, 404));
        } else {
            const deleted = await User.findByIdAndDelete(id);
            res.status(202).json({ data: deleted })
        }
      } catch (error) {
        next(error);
    }
});

module.exports = router;