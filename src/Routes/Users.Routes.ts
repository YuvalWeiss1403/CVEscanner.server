import express from "express";
import {
	getAllUsers,
	newUser,
	getOldUser,
} from "../Controllers/Users.Controllers";
const UsersRouter = express.Router();
UsersRouter.get("/", getAllUsers);
UsersRouter.post("/", getOldUser);
UsersRouter.post("/create", newUser);
export default UsersRouter;
