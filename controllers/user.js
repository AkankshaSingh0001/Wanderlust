const User=require("../models/user");

module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    const userUser=new User({email,username});
    const registeredUser=await User.register(userUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Wanderlust");
    res.redirect("/listings");
    });
    
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.rendersignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.renderloginForm=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","welcome to wanderlust");
    let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you successfully logged out!");
        res.redirect("/listings");
    })
};