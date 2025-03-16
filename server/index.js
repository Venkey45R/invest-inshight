const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UsersModel = require('./models/Users');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Insight_Invest");

app.post('/signup', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UsersModel.findOne({ email });
        if (user) {
            return res.json("user already exists");
        }
        const newUser = await UsersModel.create(req.body);

        res.json({message: "success", userId: newUser._id});
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json("Duplicate email error");
        }

        console.error("Error:", error);
        res.status(500).json("Server error");
    }
});

app.post('/details', (req, res)=>{
    const {id} = req.body;
    UsersModel.findOne({_id: id})
    .then(user => {
        if(!user){
            res.json("some internal error");
        }
        else{
            res.json(user);
        }
    })
    .catch(err => res.json(err))
})

app.post('/signin', async (req, res)=>{
    const {email, password} = req.body;
    const user = await UsersModel.findOne({email});
    if(!user){
        console.log("User not found");
        res.json({message: "user not found"});
    }
    else{
        if(user.password === password){
            const token = jwt.sign({
                email: user.email,
            }, 'secret123')
            res.json({message: "success", id: user._id, token: token});
        }
        else{
            res.json({message: "Password Incorrect"});
        }
    }
})

app.post('/update', (req, res) => {
    const { id, ...updatedData } = req.body;
    UsersModel.findByIdAndUpdate(id, updatedData, { new: true })
    .then(user => {
        res.json(user);
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
});

const port = process.env.PORT || 3001;

app.listen(port, () =>{
    console.log("Server is running");
}) 