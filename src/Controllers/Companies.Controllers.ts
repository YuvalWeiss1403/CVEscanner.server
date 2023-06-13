import mongoose from "mongoose";
import { Request, Response } from "express";
import { CompaniesModel } from "../Models/Companies.Models";
import {
	createCompany,
	getAllCompaniesData,
} from "../Services/Companies.Services";

export const getAllCompanies = async (req: Request, res: Response) => {
	try {
		const users = await getAllCompaniesData();
		return res.status(200).json(users);
	} catch (err) {
		throw err;
	}
};

export const newCompany = async (req: Request, res: Response) => {
	try {
		const { name } = req.body;
		const OldCompany = await CompaniesModel.findOne({ name });
		if (OldCompany) {
			return res.status(409).send("Company Already Exist. Please Login");
		}
		const company = await CompaniesModel.create({
			_id: new mongoose.Types.ObjectId(),
			name,
		});

		company.save();
		const newCompany = await createCompany(company);
		res.status(201).json(company);
	} catch (err) {
		throw err;
	}
};

export const getOldCompany = async function (req: Request, res: Response) {
	try {
		const { name } = req.body;
		const company = await CompaniesModel.findOne({ name });
		res.status(201).json(company);
		res.status(400).send("Invalid Credentials");
	} catch (err) {
		throw err;
	}
};
