const express=require('express')
const router=express.Router();
const mapController =require('../controllers/map.controller')
const {query}=require('express-validator')

const authMiddleware =require('../middlewares/auth.middleware')
router.get('/get-cooridinates',
    query('address').isString().isLength({min:3}),
    authMiddleware.authUser,mapController.getCoordinates
)
router.get(
  "/get-distance-time",
  [
    query("origin")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Origin must be at least 3 characters long."),
    query("destination")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Destination must be at least 3 characters long."),
    authMiddleware.authUser,
  ],
  authMiddleware.authUser,
  mapController.getDistanceTime
);

router.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getAutoCompleteSuggestions
);

module.exports=router