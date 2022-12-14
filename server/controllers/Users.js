import Users from "../model/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Reviews from "../model/ReviewsModel.js";
import Businesses from "../model/BusinessesModel.js";

Reviews.belongsTo(Users, { foreignKey: "user_id" });
Users.hasMany(Reviews, { foreignKey: "user_id" });
Businesses.hasMany(Reviews, { foreignKey: "business_id" });
export const register = async (req, res) => {
  const { email, password, fname, lname, about } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      email: email,
      password: hashPassword,
      fname: fname,
      lname: lname,
      about: about,
    });
    res.json({ msg: "Registered successfully" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "Email already exists" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const id = user[0].id;
    const email = req.body.email;
    const role = user[0].role;
    const accessToken = jwt.sign({ id, email, role }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "600000s",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 600000 * 1000,
    });

    res.json({ token: accessToken });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "Email not found" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ["id", "email", "fname", "lname"],
    });
    res.json(users);
  } catch (err) {
    console.log(e);
    res.status(404).json({ msg: "USER NOT FOUND ERROR ERROR ERROR ERROR ERROR" });
  }
};

export const logout = (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.sendStatus(204).json({ msg: "cleared" });
  res.clearCookie("accessToken");
  return res.status(200).json({ msg: "cleared" });
};

export const getUserById = async (req, res) => {
  try {
    const user = await Users.findAll({ where: { id: req.headers.user_id }, include: { model: Reviews, include: Businesses } });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "USER NOT FOUND ERROR ERROR ERROR ERROR ERROR" });
  }
};
