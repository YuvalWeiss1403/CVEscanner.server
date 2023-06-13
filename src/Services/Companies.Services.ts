import { CompaniesModel, ICompanies } from "../Models/Companies.Models";

export const getAllCompaniesData = async () => {
	try {
		const companies = await CompaniesModel.find();
		return companies;
	} catch (err) {
		throw err;
	}
};
export const createCompany = async (company: ICompanies) => {
	const newCompany = new CompaniesModel(company);
	try {
		await newCompany.save();

		return newCompany;
	} catch (err) {
		throw err;
	}
};
