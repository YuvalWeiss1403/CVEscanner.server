import express from "express";
import { getAllUsers, newUser } from "../Controllers/Users.Controllers";
const UsersRouter = express.Router();
UsersRouter.get("/", getAllUsers);
UsersRouter.post("/create", newUser);
export default UsersRouter;
