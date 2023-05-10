import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const token = process.env.SECRET;
const uri = token;
export const connectToDB = async () => {
	try {
		await connect(`${uri}`);
		("db connected");
	} catch (err) {
		console.log("error connecting to db", err);
	}
};
