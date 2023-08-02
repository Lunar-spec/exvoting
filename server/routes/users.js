import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";

import User from "../mongodb/models/user.js";

dotenv.config();

const router = express.Router();

router.post('/reg', async (req, res) => {
    try {

        const { username, role, password, constituency } = req.body;

        if (!(role && password && username && constituency)) {
            res.status(400).send("All input is required");
        }
        //*checking for existing user
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(409).json({ error: 'User with this username already exists' });
        }

        //*make password
        const hashedPassword = await bcrypt.hash(password, 10);

        //*create user
        const newUser = await User.create({
            username,
            role,
            password: hashedPassword,
            constituency,
        })

        //*jwt token
        const token = jwt.sign({
            user_id: newUser._id,
            role,
            username,
            constituency
        },
            process.env.SECRET_KEY,
            {
                expiresIn: "2h",
            })

        ////saving the token
        newUser.token = token

        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json({ error: "Error" })
    }
})

router.post('/login', async (req, res) => {
    try {
        //*find user
        const foundUser = await User.findOne({ username: req.body.username })
        console.log(foundUser)

        if (foundUser) {
            const validPassword = await bcrypt.compare(
                req.body.password,
                foundUser.password
            );

            if (validPassword) {
                //*if both password match
                //?generating jwt token
                const token = jwt.sign({
                    username: foundUser.username
                },
                    process.env.SECRET_KEY, {
                    expiresIn: "2h"
                });

                foundUser.token = token

                res.status(200).json({ username: foundUser.username, token, user_id: foundUser._id, role: foundUser.role, constituency: foundUser.constituency });
            } else {
                //!if passwords don't match
                res.status(400).json({ error: "Invalid username or password" })
            }
        } else {
            //!if user isn't even there
            res.status(400).json({ error: "Invalid username or password" })
        }
    } catch (error) {
        res.status(500).json({ error: "Error" })
    }
})

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({}, '-password');

        res.status(200).json(allUsers)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users data' });
    }
})

router.put('/superAdmin', async (req, res) => {
    try {
        const { userId, role, constituency } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.role = role;
        user.constituency = constituency;
        await user.save();
        return res.json({ message: 'User data updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error editing user data' });
    }
})

router.delete('/superAdmin/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndRemove(id).exec();
        return res.json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error deleting user' });
    }
})

export default router
