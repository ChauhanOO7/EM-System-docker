const {users}=require("../models/signup");

async function handleadmin(req,res)
{
    const data=req.body;
    const check=await users.findOne({email:data.email,password:data.password});

    return res.json(check);
}

module.exports={handleadmin};