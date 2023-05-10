import mongoose, { ObjectId, Schema } from "mongoose";
export interface IUsers {
	_id?: ObjectId;
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
}

export const usersSchema = new Schema<IUsers>({
	_id: { type: Schema.Types.ObjectId, required: false },
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	isAdmin: { type: Boolean, required: true },
});
export const UsersModel = mongoose.model<IUsers>("users", usersSchema);
