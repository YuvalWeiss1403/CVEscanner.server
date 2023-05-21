import mongoose, { ObjectId, Schema } from "mongoose";
export interface IDevices {
	_id?: ObjectId;
	Location: string;
	IpAddress: string;
	PatchHistory: string[];
	year: number;
	Type: string;
	companyID: string;
}

export const devicesSchema = new Schema<IDevices>({
	_id: { type: Schema.Types.ObjectId, required: false },
	Location: { type: String, required: true },
	IpAddress: { type: String, required: true },
	PatchHistory: { type: [String], required: true },
	year: { type: Number, required: false },
	Type: { type: String, required: false },
	companyID: { type: String, required: true },
});
export const DevicesModel = mongoose.model<IDevices>("devices", devicesSchema);
