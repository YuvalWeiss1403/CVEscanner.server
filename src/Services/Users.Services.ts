import { IUsers, UsersModel } from "../Models/Users.Models";

export const getAllUsersData = async () => {
	try {
		const users = await UsersModel.find();
		return users;
	} catch (err) {
		throw err;
	}
};
export const createUser = async (user: IUsers) => {
	const newUser = new UsersModel(user);
	try {
		await newUser.save();

		return newUser;
	} catch (err) {
		throw err;
	}
};
