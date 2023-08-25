const { create } = require('domain');
const Users = require('../models/userModel')

exports.getAllUsers = async (req,res,next)=>{
    try{
        const users = await Users.find();
        res.status(200).send({
            status:"Successful",
            data:users
        })
    }
    catch(err){
        console.log("Error Occured ..",err)
        res.status(201).send({
            status:"fail",
            message:err
        })
    }
}

exports.addUser = async (req,res,next)=>{
    try{
        const user = await Users.create(req.body)
        res.status(404).send({
            status:"Successful",
            user:user
        })
    }catch(err){
        res.status(404).send({
            status:'fail',
            message:err
        })
    }
}

exports.updateUser = async (req,res,next)=>{
    if(req.body.password||req.body.confirmPassword) return res.status(404).send("This route is not for password updates will make that later")
    if(req.body.role){
        return res.status(404).send({
            status:'Unsuccessful',
            message:"Role can only be updated manually"
        })
    }
    const user  = await Users.findByIdAndUpdate(req.params.id,req.body,{
        runValidators:true,
        new:true
    })
    res.status(200).send({
        status:"Successful",
        updatedUser:user
    })
}

exports.deleteUser = async (req,res,next)=>{
    await Users.findByIdAndDelete(req.params.id)
    res.status(400).send('Deleted')
}