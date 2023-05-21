import mongoose from "mongoose";
import { Request, Response } from "express";
import { DevicesModel } from "../Models/Devices.Models";
import { createDevice, getAllDevicesData } from "../Services/Devices.Services";
import { CompaniesModel } from "../Models/Companies.Models";

export const getAllDevices = async (req: Request, res: Response) => {
	try {
		const devices = await getAllDevicesData();
		return res.status(200).json(devices);
	} catch (err) {
		throw err;
	}
};

export const newDevice = async (req: Request, res: Response) => {
	try {
		const { location, ipAddress, patchHistory, year, type, companyName } =
			req.body;
		const OldDevice = await DevicesModel.findOne({ ipAddress });
		if (OldDevice) {
			return res.status(409).send("Device Already Exist. Please enter again");
		}
		const OldCompany = await CompaniesModel.findOne({ companyName });

		const device = await DevicesModel.create({
			_id: new mongoose.Types.ObjectId(),
			Location: location,
			IpAddress: ipAddress,
			PatchHistory: patchHistory,
			year: year,
			Type: type,
			companyID: OldCompany?._id,
		});

		device.save();
		const newCompany = await createDevice(device);
		res.status(201).json(device);
	} catch (err) {
		throw err;
	}
};

export const getOldDevice = async function (req: Request, res: Response) {
	try {
		const { ipAddress } = req.body;
		const device = await DevicesModel.findOne({ ipAddress });
		res.status(201).json(device);
		res.status(400).send("Invalid Credentials");
	} catch (err) {
		throw err;
	}
};
