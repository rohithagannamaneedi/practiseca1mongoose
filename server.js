const express = require("express")
const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const userSchema = require("./schema");

app.use(express.json());

app.post('/user',async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            res.status(400).send({msg:"All fields are required"});
        }
        const existingUser = await userSchema.findOne({email});
        if(existingUser){
            res.status(500).send({msg:"user already exists"});
        }
        const newData = new userSchema({name,email,password});
        await newData.save();
        res.status(201).send({msg:"User created successfully",newData});
    } catch (error) {
        res.status(500).send({msg:"Something went wrong",error});
        console.log(error)
    }
});

app.get('/getuser', async (req, res) => {
    try {
        const newData = await userSchema.find();
        res.status(200).send({ msg: "User retrieved successfully", newData });
    } catch (error) {
        res.status(500).send({ msg: "Something went wrong", error });
        console.log(error);
    }
});

app.put('/updateuser/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            res.status(400).send({msg:"Please provide id"});
        }
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            res.status(400).send({msg:"All fields are required"});
        }
        const update = await userSchema.findOneAndUpdate({_id:id},
            {name,email,password}
        );
        res.status(200).send({msg:"user updated successfully",update});

    } catch (error) {
        res.status(500).send({ msg: "Something went wrong", error });
    }
});

app.delete('/deleteuser/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
        res.status(400).send({msg:"Please provide id"});
        }
        const deletes = await userSchema.findOneAndDelete({_id:id});
        res.status(200).send({msg:"user deleted successfully",deletes});
    } catch (error) {
      res.status(500).send("Something went wrong");  
    }
});


app.listen(8080,async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Server connected successfully");
    } catch (error) {
        console.log("Error",error)
    }
})

