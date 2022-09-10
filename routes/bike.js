const router = require('express').Router();
const Bike = require('../models/Bike');
const ErrorResponse = require('../utils/error');
const { isAuthenticated } = require('../middlewares/jwt')  

// @desc    GET all the bikes
// @route   GET /api/v1/bike
// @access  Public
router.get('/', isAuthenticated, async (req, res, next) => {
    try {
      const bikes = await Bike.find({});
      if(!bikes) {
        return next(new ErrorResponse('No bikes found', 204));
      } 
      res.status(200).json({ data: bikes })
    } catch (error) {
        next(error);
    }
});

// @desc    GET single bike
// @route   GET /api/v1/
// @access  Public
router.get('/:id', isAuthenticated, async (req, res, next) => {
    const { id } = req.params;
    try {
      const bike = await Bike.findById(id);
      if(!bike) {
        return next(new ErrorResponse('Bike not found', 404));
      } 
      res.status(200).json({ data: bike })
    } catch (error) {
        next(error);
    }
});

module.exports = router;