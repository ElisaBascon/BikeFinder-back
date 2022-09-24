const router = require('express').Router();
const Bike = require('../models/Bike');
const ErrorResponse = require('../utils/error');
const { isAuthenticated } = require('../middlewares/jwt');  
const Favorite = require('../models/Favorite');

// @desc    GET all favorites
// @route   GET /api/v1/favorite
// @access  Public
router.get('/', isAuthenticated, async (req, res, next) => {
    try {
      const favorites = await Favorite.find({}).populate("bikeId");
      if(favorites.length === 0) {
        return next(new ErrorResponse('No favorites found', 204));
      } 
      res.status(200).json({ data: favorites })
    } catch (error) {
        next(error);
    }
});

// @desc    Save my Favourites Bikes
// @route   POST /api/v1/favorite
// @access  Public
router.post('/:bikeId', isAuthenticated, async (req, res, next) => {
  const { bikeId } = req.params;
  const userId = req.payload._id;
  console.log(bikeId, userId)
  try {
    const bikeIsFavorite = await Favorite.find({userId:userId, bikeId:bikeId});
    if (bikeIsFavorite.length === 0){
        const newFavorite = await Favorite.create({ userId: userId, bikeId: bikeId });
        res.status(201).json({ data: newFavorite})
        if(!newFavorite) {
            return next(new ErrorResponse('A error ocurred while adding a bike to my Favourites', 500));
          } 
    }
    
  
    
  } catch (error) {
      next(error);
  }
});

module.exports = router;