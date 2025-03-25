const express=require("express");
const path=require("path");
const favicon=require("serve-favicon");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const cors=require("cors");
const viewpath=path.join(__dirname,"views");
const app=express();
const PORT=8000;
const database_url=process.env.database_url || "mongodb://host.docker.internal:27017/employ";

//routes
const signuproute=require("./routes/signup");
const employroute=require("./routes/employ");
const adminroute=require("./routes/admin");

//database connectivity

mongoose.connect(database_url).then(()=>{
    console.log("database is connected...");
}).catch((err)=>{
    console.error(err);
});

//middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.set("view engine","pug");
app.set("views",viewpath);
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname,"/static")));

//routing
app.get("/",(req,res)=>{
    return res.render("home");
});

app.use("/signup",signuproute);
app.use("/employ",employroute);
app.use("/admins",adminroute);


app.listen(PORT,()=>{
    console.log("server is connected...");
});