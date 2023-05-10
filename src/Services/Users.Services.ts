import { UsersModel } from "../Models/Users.Models";

export const getAllUsersData = async () => {
	try {
		const users = await UsersModel.find();
		return users;
	} catch (err) {
		throw err;
	}
};
