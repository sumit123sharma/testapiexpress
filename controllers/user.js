const express = require('express')
const User = require('../models/user.js')
const bcrypt = require('bcrypt')



exports.getInfo = async (req, res) => {
    res.json({ "message": "Hello Express Application! you are in production" });
}


exports.create = async (req, res) => {
    try {
        let data = req.body
        let hashPassword = bcrypt.hashSync(req.body.password, 10)
        data.password = hashPassword

        let emailExist = await User.findOne({ email: req.body.email })

        if (emailExist) {
            res.send({
                status: 400,
                message: "Email Already Exist"
            });

        } else {
            new User(data).save(function (err, doc) {
                if (err) console.log(err)
                res.send({
                    status: 200,
                    message: "user added successfully", doc
                })
            })
        }

    } catch (err) {
        res.send({
            status: 500,
            message: err.message
        });
    }
};


exports.login = async (req, res) => {
    try {
        let data = req.body
      

        let emailExist = await User.findOne({ email: req.body.email })

        if (!emailExist) {
            res.send({
                status: 404,
                message: "User not found"
            });

        } else {
            let pwdCheck = await bcrypt.compare(req.body.password, emailExist.password)

            if (pwdCheck) {
                res.send({
                    status: 200,
                    message: "Password matched login successfull", emailExist
                });

            } else {
                    res.send({
                        status: 400,
                        message: "Incorrect password"
                    })
                
            }
        }

    } catch(err) {
        res.send({
            status: 500,
            message:err.message
            });
    }
    
}

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const countClient = await User.find().countDocuments()
        const user = await User.find().sort({ createdAt: -1 })
            .skip(req.body.page > 0 ? (req.body.page - 1) * 10 : 0)
            .limit(10)
        res.status(200).json({
            status:200,
            message: "usres fetch successfully", user, countClient
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.findSingleUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId })
        console.log("id is======", req.body.userId)
        if (user) {
            res.status(200).send({
                message: "user find successfully", user
            })
        } else {
            res.status(400).send({
                message: "user not found"
            })
        }

    } catch (err) {
        res.status(400).send({
            message: err.message
            })
    }
}

exports.findById = async (req, res) => {
    console.log("id is======", req.params.id)

    try {
        const user = await User.findById(req.params.id)
        if (user) {
            res.status(200).send({
                message: "user find successfully by Id", user
            })
        } else {
            res.status(400).send({
                message: "user not found"
            })
        }

    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
}

exports.updateUserById = async (req, res) => {
    try {
        const id = req.params.id
        const updateData = req.body
        const option = { new: true }

        const updateUser = await User.findByIdAndUpdate(id, updateData, option)

        if (updateUser) {
            res.status(200).json({
                message: "user updated successfully", updateUser
            })
        } else {

            res.status(400).send({
            message:"error while updating"
            })
        }
    } catch (err) {
        messaage: err.message
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id
        const deleteUser = await User.findByIdAndDelete(id)

        if (deleteUser) {
            res.status(200).json({
                message: "user deleted successfully", deleteUser
            })
        } else {
            res.status(400).send({
                message: "error while updating"
            })
        }
    } catch (err) {
        messaage: err.message
    }
}


