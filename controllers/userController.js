const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// logic for register
exports.userRegister = async (req, res) => {
    console.log("Inside register function");
    // res.send('request received...')

    const { username, email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            res.status(401).json("Already User Existed")
        }
        else {
            newUser = new User({ username, email, password })
            await newUser.save()
            res.status(200).json({ message: "Register succefully", newUser })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.userLogin = async (req, res) => {
    console.log("inside login function");

    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })


        if (existingUser) {
            if (password == existingUser.password) {
                // token generation
                const token = jwt.sign(
                    { userMail: existingUser.email, role: existingUser.role },
                    process.env.jwtKey
                );
                console.log("token :", token);

                res.status(200).json(
                    {
                        message: "Login succefully",
                        existingUser,
                        token
                    });

            }
            else {
                res.status(401).json({ message: "Password is incorrect" });

            }
        }
        else {
            res.status(401).json({ message: "User not found" });

        }
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: "Internal server error" });
    }

}


// *google Authentication

exports.GoogleLogin = async (req, res) => {
    console.log("inside google login");
    const { email, profile, password, username } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            // token generation
            const token = jwt.sign({ userMail: existingUser.email, role: existingUser.role }, process.env.jwtKey)
            console.log(token);
            res.status(200).json({ message: "Login succefully", existingUser, token })
        }
        else {
            const newUser = new User({ email, profile, password, username })
            await newUser.save()
            // token generation
            const token = jwt.sign({ userMail: newUser.email, role: newUser.role }, process.env.jwtKey)
            console.log(token);
            res.status(200).json({ existingUser: newUser, token })
        }

    } catch (error) {
        res.status(500).json(error)
    }

}



exports.getUsers = async (req, res) => {
    try {

        const getUser = await User.find({ role: { $ne: "Admin" } })
        res.status(200).json(getUser)
    } catch (err) {
        console.log("Error" + err);
    }
}


// *Admin Update Profile

exports.updateAdmin = async (req, res) => {

    console.log("inside update Admin");

    // ** get bodyy
    const { username, password, bio, profile } = req.body
    // **get email
    const email = req.payload
    // *get role
    const role = req.role
    // update profile photo
    const updateProfile = req.file ? req.file.filename : profile

    try {

        const updateAdmin = await User.findOneAndUpdate({ email },
            { username, email, password,profile: updateProfile, bio,role},{new:true})
        await updateAdmin.save()
        res.status(200).json({ message: "Updated Successfullyy...", updateAdmin })



    } catch (err) {
        res.status(500).json("err" + err)

    }
}

// ** get admin
exports.getAdmin= async (req, res) => {
    try {
        const admin = await User.findOne({ role:  "Admin" })
        res.status(200).json(admin)
    } catch (err) {
        console.log("Error" + err);
    }
}

exports.updateUser= async (req, res) => {

    console.log("inside update User");
console.log(req.body);

    // ** get bodyy
    const { username, password, bio, profile } = req.body
    // **get email
    const email = req.payload
    // *get role
    // const role = req.role
    // update profile photo
    const updateProfile = req.file ? req.file.filename : profile

    try {

        const updateUser = await User.findOneAndUpdate({ email },
            { $set:{ username, email, password,profile: updateProfile, bio}},{new:true})
        await updateUser.save()
        res.status(200).json({ message: "Updated Successfullyy...", updateUser })



    } catch (err) {
        res.status(500).json("err" + err)

    }
}


// *get user to update profile
exports.getUserUpdate= async (req, res) => {
    try {
        const user = await User.findOne({ role:  "BookStore Users" })
        res.status(200).json(user)
    } catch (err) {
        console.log("Error" + err);
    }
}