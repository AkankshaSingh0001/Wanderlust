const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync");
const ExpressError=require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn,isReviewAuthor}=require("../middleware.js");
const ReviewController=require("../controllers/reviews.js");

router.post("/",isLoggedIn,validateReview,wrapAsync(ReviewController.createreview));
  

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(ReviewController.deletereview))
  
module.exports=router;