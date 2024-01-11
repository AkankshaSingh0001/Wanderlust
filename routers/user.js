const express=require("express");
const router=express.Router();
const User=require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");

const Usercontroller=require("../controllers/user.js");

router 
    .route("/signup")
    .get(Usercontroller.rendersignupForm)
    .post(wrapAsync(Usercontroller.signup));

router
    .route("/login")
    .get(Usercontroller.renderloginForm)
    .post(saveRedirectUrl,passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true,
    }),Usercontroller.login);

router.get("/logout",Usercontroller.logout);

module.exports=router;
