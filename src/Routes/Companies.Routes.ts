import express from "express";
import {
	getAllCompanies,
	getOldCompany,
	newCompany,
} from "../Controllers/Companies.Controllers";

const CompaniesRouter = express.Router();
CompaniesRouter.get("/", getAllCompanies);
CompaniesRouter.post("/", getOldCompany);
CompaniesRouter.post("/create", newCompany);
export default CompaniesRouter;
