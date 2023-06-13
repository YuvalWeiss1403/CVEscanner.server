import express from "express";
import users from "../Routes/Users.Routes";
import companies from "../Routes/Companies.Routes";
import devices from "../Routes/Devices.Routes";
const router = express.Router();

router.use("/users", users);
router.use("/companies", companies);
router.use("/devices", devices);

export default router;
