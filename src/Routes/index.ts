import express from "express";
import users from "../Routes/Users.Routes";
const router = express.Router();

router.use("/users", users);

export default router;
