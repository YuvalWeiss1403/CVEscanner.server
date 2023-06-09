import mongoose from "mongoose";
import { UsersModel } from "../Models/Users.Models";
import { createUser, getAllUsersData } from "../Services/Users.Services";
import { Request, Response } from "express";
let bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
import { CompaniesModel } from "../Models/Companies.Models";
import { createCompany } from "../Services/Companies.Services";
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
		const { firstName, lastName, email, password, companyName } = req.body;
		if (!(firstName && lastName && email && password && companyName)) {
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
		const oldCompany = await CompaniesModel.findOne({ companyName });

		if (oldUser) {
			return res.status(409).send("User Already Exist. Please Login");
		}
		if (oldCompany === null) {
			await createNewCompany(companyName);
		}

		const encryptedPassword = await bcrypt.hash(password, 10);
		const user = await UsersModel.create({
			_id: new mongoose.Types.ObjectId(),
			firstName,
			lastName,
			email: email.toLowerCase(),
			password: encryptedPassword,
			companyName: companyName,
		});

		const token = jwt.sign({ user_id: user._id, email }, tokenKey, {
			expiresIn: "2h",
		});

		user.token = token;
		await user.save();
		const newUser = await createUser(user);
		res.status(201).json(newUser);
	} catch (err) {
		throw err;
	}
};

const createNewCompany = async (companyName: string) => {
	try {
		const company = await CompaniesModel.create({
			_id: new mongoose.Types.ObjectId(),
			companyName,
		});
		const newCompany = await createCompany(company);
		await newCompany.save();
	} catch (err) {
		throw err;
	}
};

export const getOldUser = async function (req: Request, res: Response) {
	try {
		const { email, password } = req.body;
		if (!(email && password)) {
			return res.status(400).send("All input is required");
		}

		const user = await UsersModel.findOne({ email });

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign({ user_id: user._id, email }, tokenKey, {
				expiresIn: "2h",
			});

			user.token = token;
			return res.status(201).json(user);
		}

		return res.status(400).send("Invalid Credentials");
	} catch (err) {
		throw err;
	}
};
