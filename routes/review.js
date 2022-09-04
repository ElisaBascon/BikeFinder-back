const router = require('express').Router();
const Review = require('../models/Review');
const ErrorResponse = require('../utils/error');

// @desc    GET all the review
// @route   GET /api/v1/
// @access  Public
router.get('/', async (req, res, next) => {
    try {
      const reviews = await Review.find({});
      if(!reviews) {
        next(new ErrorResponse('No reviews found', 404));
      } 
      res.status(200).json({ data: reviews })
    } catch (error) {
        next(error);
    }
});

// @desc    GET single review
// @route   GET /api/v1/
// @access  Public
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
      const reviews = await Review.findById(id);
      if(!reviews) {
        next(new ErrorResponse('Review not found', 404));
      } 
      res.status(200).json({ data: reviews })
    } catch (error) {
        next(error);
    }
});

// @desc    Create a review
// @route   POST /api/v1/
// @access  Public
router.post('/', async (req, res, next) => {
    const { image, title, description } = req.body;
    try {
      const reviews = await Review.create({ image, title, description });
      if(!reviews) {
        next(new ErrorResponse('A error ocurred while creating the review', 500));
      } 
      res.status(201).json({ data: reviews })
    } catch (error) {
        next(error);
    }
});

// @desc    Edit a review
// @route   PUT /api/v1/
// @access  Public
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { image, title, description } = req.body;
    try {
        const reviews = await Review.findById(id);
        if(!reviews) {
          next(new ErrorResponse(`Project not found by ${id}`, 404));
        } else {
            const updateReview = await Review.findByIdAndUpdate(id, { image, title, description }, {new: true});
            res.status(202).json({ data: updateReview })
        }
      } catch (error) {
        next(error);
    }
});

// @desc    Delete a review
// @route   DELETE /api/v1/
// @access  Public
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const reviews = await Review.findById(id);
        if(!reviews) {
          next(new ErrorResponse(`Project not found by ${id}`, 404));
        } else {
            const deleted = await Review.findByIdAndDelete(id);
            res.status(202).json({ data: deleted })
        }
      } catch (error) {
        next(error);
    }
});

module.exports = router;