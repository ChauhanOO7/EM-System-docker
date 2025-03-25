const express=require("express");
const router=express.Router();
const {handlesignup}=require("../controllers/signup");

router.get("/",(req,res)=>{
    res.render("signup");
});

router.post("/",handlesignup);


module.exports=router;