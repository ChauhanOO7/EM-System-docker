const {users}=require("../models/signup");

async function handlesignup(req,res)
{
    const data=req.body;
    const user=await users({
        name:data.name,
        email:data.email,
        password:data.Password
    });

    user.save();

    return res.redirect(301,"/");

}

module.exports={handlesignup};