const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer=require('multer');
const {storage}=require("../cloudconfig.js");
const upload=multer({storage});

//New Route
router.get("/new",isLoggedIn,listingController.rendernewform);

router
  .route("/")
  .get( wrapAsync(listingController.index))
  .post(isLoggedIn ,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createlistings));

router
  .route("/:id")
  .get(wrapAsync(listingController.showlisting))
  .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updatelistings))
  .delete(isLoggedIn,isOwner,wrapAsync(listingController.deletelistings));

//Edit Route
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.editlistings));

module.exports=router;
