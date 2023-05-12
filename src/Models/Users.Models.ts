import mongoose, { ObjectId, Schema } from "mongoose";
export interface IUsers {
	_id?: ObjectId;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	token?: string;
	isAdmin?: boolean;
}

export const usersSchema = new Schema<IUsers>({
	_id: { type: Schema.Types.ObjectId, required: false },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	token: { type: String, required: false },
	isAdmin: { type: Boolean, required: false, default: false },
});
export const UsersModel = mongoose.model<IUsers>("users", usersSchema);
