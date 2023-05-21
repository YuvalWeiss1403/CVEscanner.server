import { DevicesModel, IDevices } from "../Models/Devices.Models";

export const getAllDevicesData = async () => {
	try {
		const devices = await DevicesModel.find();
		return devices;
	} catch (err) {
		throw err;
	}
};
export const createDevice = async (device: IDevices) => {
	const newDevice = new DevicesModel(device);
	try {
		await newDevice.save();

		return newDevice;
	} catch (err) {
		throw err;
	}
};
