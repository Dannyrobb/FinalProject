import express from "express";
import { register, login, getUsers, logout, getUserById } from "../controllers/Users.js";
import { VerifyToken } from "../middlewares/VerifyToken.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users", VerifyToken, getUsers);
userRouter.delete("/logout", logout);
userRouter.get("/token", VerifyToken, (req, res) => {
  res.status(200).json({ msg: "OK" });
});
userRouter.get("/getUserById", getUserById);

export default userRouter;
