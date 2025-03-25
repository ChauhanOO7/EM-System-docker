const {employs}=require("../models/employes");

async function updateemploy(req,res)
{
    const data=req.body;
    let duplicate=false;
    
    let path_img="geg";
    if(req.file)  path_img=req.file.path; 
    
    await employs.findOneAndUpdate({Email:data.Email},{
        Name:data.name,
        Email:data.email,
        Mobileno:data.mobileno,
        Designation:data.desg,
        Gender:data.gender,
        Course:data.course,
        img:path_img

    });

    return res.json({duplicate:false});
}

async function deleteemploy(req,res)
{
    const data=req.body;
    
    await employs.deleteOne({Email:data.Email});

    return res.json({navi:true});
}

module.exports={updateemploy,deleteemploy};