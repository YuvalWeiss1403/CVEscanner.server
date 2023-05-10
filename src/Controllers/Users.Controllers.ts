import { getAllUsersData } from "../Services/Users.Services";
import { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await getAllUsersData();
		return res.status(200).json(users);
	} catch (err) {
		throw err;
	}
};
