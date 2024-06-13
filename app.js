const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcryptjs")     //for encryption
const {blogmodel}=require("./models/blog")

const app=express()
app.use(cors())
app.use(express.json())

 mongoose.connect("mongodb+srv://shafnashakeersm:Shafna123@cluster0.2srguee.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")

//encrypting password operation  (npm i bcryptjs)
const generateHashedPassword=async(password)=>{
const salt=await bcrypt.genSalt(10)
return bcrypt.hash(password,salt)
}

//signup file
app.post("/signup",async(req,res)=>{
    let input=req.body
    let hashedpassword=await generateHashedPassword(input.pasword)
    console.log(hashedpassword)
    input.password=hashedpassword  //to change in input otherwise in db it will be plane password
    let users=new blogmodel(input)
    users.save()
    res.send({status:"success"})
})
   

app.listen(8080,()=>{
    console.log("server started")
})