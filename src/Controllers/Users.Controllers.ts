import mongoose from "mongoose";
import { UsersModel } from "../Models/Users.Models";
import { createUser, getAllUsersData } from "../Services/Users.Services";
import { Request, Response } from "express";
let bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
const tokenKey = process.env.TOKEN_KEY || "default_value";

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await getAllUsersData();
		return res.status(200).json(users);
	} catch (err) {
		throw err;
	}
};

export const newUser = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		if (!(firstName && lastName && email && password)) {
			return res.status(400).send("All input is required");
		}
		if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
			return res
				.status(400)
				.send(
					"Password must contain at least 8 characters with a combination of uppercase and lowercase letters and numbers."
				);
		}
		const oldUser = await UsersModel.findOne({ email });
		if (oldUser) {
			return res.status(409).send("User Already Exist. Please Login");
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		const user = await UsersModel.create({
			_id: new mongoose.Types.ObjectId(),
			firstName,
			lastName,
			email: email.toLowerCase(), // sanitize: convert email to lowercase
			password: encryptedPassword,
		});
		const token = jwt.sign({ user_id: user._id, email }, tokenKey, {
			expiresIn: "2h",
		});

		user.token = token;
		user.save();
		const newUser = await createUser(user);
		res.status(201).json(newUser);
	} catch (err) {
		throw err;
	}
};

export const getOldUser = async function (req: Request, res: Response) {
	try {
		const { email, password } = req.body;
		if (!(email && password)) {
			res.status(400).send("All input is required");
		}
		const user = await UsersModel.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign({ user_id: user._id, email }, tokenKey, {
				expiresIn: "2h",
			});

			user.token = token;
			res.status(201).json(user);
		}
		res.status(400).send("Invalid Credentials");
	} catch (err) {
		throw err;
	}
};
