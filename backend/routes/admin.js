const express=require("express");
const router=express.Router();
const {handleadmin}=require("../controllers/admin");

router.post("/",handleadmin);

module.exports=router;