const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//@desc Register a user
//@route GET /users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered!")
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username: username, email: email, password: hashedPassword
    });
    if (user) {
        res.status(201).json({
            _id: user.id, name: user.username, email: user.email, message: "User created successfully."
        })
    } else {
        res.status(400)
        throw new Error(
            "User data is not valid."
        )
    }
});
//@desc login a user
//@route GET /users/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    // compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        )
        res.status(200).json({ accessToken });
    } else {
        res.status(401)
        throw new Error("Email or Password is not valid!")
    }
});
//@desc Get current info of the user
//@route GET /users/current
//@access private as only logged in user should be able to view the current user

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
});

module.exports = { registerUser, loginUser, currentUser }