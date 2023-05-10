import express from "express";
import { getAllUsers } from "../Controllers/Users.Controllers";
const UsersRouter = express.Router();
UsersRouter.get("/", getAllUsers);
export default UsersRouter;
