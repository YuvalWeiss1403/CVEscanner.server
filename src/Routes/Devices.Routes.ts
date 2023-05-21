import express from "express";
import {
	getAllDevices,
	getOldDevice,
	newDevice,
} from "../Controllers/Devices.Controller";

const DevicesRouter = express.Router();
DevicesRouter.get("/", getAllDevices);
DevicesRouter.post("/", getOldDevice);
DevicesRouter.post("/create", newDevice);
export default DevicesRouter;
