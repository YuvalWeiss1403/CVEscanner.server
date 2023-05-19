import express from "express";
import users from "../Routes/Users.Routes";
import companies from "../Routes/Companies.Routes";
const router = express.Router();

router.use("/users", users);
router.use("/companies", companies);

export default router;
