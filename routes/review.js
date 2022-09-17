const router = require('express').Router();
const Review = require('../models/Review');
const ErrorResponse = require('../utils/error');
const { isAuthenticated } = require('../middlewares/jwt')  
const fileUploader = require("../config/cloudinary.config");

// @desc    GET all the review
// @route   GET /api/v1/
// @access  Public
router.get('/', isAuthenticated , async (req, res, next) => {
    try {
      const reviews = await Review.find({});
      if(!reviews.length) {
        return next(new ErrorResponse('No reviews found', 204));
      } 
      res.status(200).json({ data: reviews })
    } catch (error) {
        next(error);
    }
});


// @desc    GET my reviews
// @route   GET /api/v1/
// @access  Public
router.get('/mine', isAuthenticated , async (req, res, next) => {
  try {
    const reviews = await Review.find({userId: req.payload._id});
    if(!reviews.length) {
      return next(new ErrorResponse('No reviews found', 204));
    } 
    res.status(200).json({ data: reviews })
  } catch (error) {
      next(error);
  }
});

// @desc    GET single review
// @route   GET /api/v1/
// @access  Public
router.get('/:id', isAuthenticated , async (req, res, next) => {
    const { id } = req.params;
    try {
      const review = await Review.findById(id);
      if(!review) {
        return next(new ErrorResponse('Review not found', 404));
      } 
      res.status(200).json({ data: review })
    } catch (error) {
        next(error);
    }
});


// @desc    Upload a picture to Cloudinary
// @route   POST /api/v1/review/upload
// @access  Public
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new ErrorResponse('Error uploading the image', 500));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

// @desc    Create a review
// @route   POST /api/v1/review
// @access  Public
router.post('/', isAuthenticated, async (req, res, next) => {
    const { imageUrl, title, description } = req.body;
    const userId = req.payload._id;
    try {
      const review = await Review.create({ userId: userId, imageUrl, title, description });
      if(!review) {
        return next(new ErrorResponse('A error ocurred while creating the review', 500));
      } 
      res.status(201).json({ data: review })
    } catch (error) {
        next(error);
    }
});

// @desc    Edit a review
// @route   PUT /api/v1/
// @access  Public
router.put('/:id', isAuthenticated, async (req, res, next) => {
    const { id } = req.params;
    const { image, title, description } = req.body;
    try {
        const review = await Review.findById(id);
        if(!review) {
          return next(new ErrorResponse(`Review not found by ${id}`, 404));
        } else {
            const updatedReview = await Review.findByIdAndUpdate(id, { image, title, description }, {new: true});
            res.status(202).json({ data: updatedReview })
        }
      } catch (error) {
        next(error);
    }
});

// @desc    Delete a review
// @route   DELETE /api/v1/
// @access  Public
router.delete('/:id', isAuthenticated, async (req, res, next) => {
    const { id } = req.params;
    try {
        const review = await Review.findById(id);
        if(!review) {
          return next(new ErrorResponse(`Review not found by ${id}`, 404));
        } else {
            const deleted = await Review.findByIdAndDelete(id);
            res.status(202).json({ data: deleted })
        }
      } catch (error) {
        next(error);
    }
});

module.exports = router;