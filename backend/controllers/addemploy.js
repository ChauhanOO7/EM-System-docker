const {employs}=require("../models/employes");
const path=require("path");

async function addemploy(req,res)
{
    const data=req.body;
    const check=await employs.findOne({Email:data.email});
    if(check)
    {
        return res.json({duplicate:true});
    }
    
    let path_img="/images/man.png";
    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
    });

    if(req.file)  path_img=`/uploads/${req.file.filename}`;
    const employ=await employs({
        Name:data.name,
        Email:data.email,
        Mobileno:data.mobileno,
        Designation:data.desg,
        Gender:data.gender,
        Course:data.course,
        created:formattedDate,
        img:path_img
    });

    employ.save();

    return res.json({duplicate:false});
}


async function getalldata(req,res)
{
    const alldata=await employs.find({});

    return res.json(alldata);
}

async function searcheddata(req,res)
{

    const searchQuery = req.body.searchthing;
    const alldata = await employs.find({ Name: searchQuery});
    console.log(alldata)
    return res.json(alldata);

}

module.exports={addemploy,getalldata,searcheddata};