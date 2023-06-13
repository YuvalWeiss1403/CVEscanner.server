import mongoose, { ObjectId, Schema } from "mongoose";
export interface ICompanies {
	_id?: ObjectId;
	companyName: string;
}

export const CompaniesSchema = new Schema<ICompanies>({
	_id: { type: Schema.Types.ObjectId, required: false },
	companyName: { type: String, required: true },
});
export const CompaniesModel = mongoose.model<ICompanies>(
	"companies",
	CompaniesSchema
);
