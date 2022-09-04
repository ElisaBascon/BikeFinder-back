const router = require('express').Router();
const Bike = require('../models/Bike');
const ErrorResponse = require('../utils/error');

// @desc    GET all the bikes
// @route   GET /api/v1/
// @access  Public
router.get('/', async (req, res, next) => {
    try {
      const bikes = await Bike.find({});
      if(!bikes) {
        next(new ErrorResponse('No bikes found', 404));
      } 
      res.status(200).json({ data: bikes })
    } catch (error) {
        next(error);
    }
});

// @desc    GET single bike
// @route   GET /api/v1/
// @access  Public
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const bikes = await Bike.findById(id);
      if(!bikes) {
        next(new ErrorResponse('Bike not found', 404));
      } 
      res.status(200).json({ data: bikes })
    } catch (error) {
        next(error);
    }
});

module.exports = router;