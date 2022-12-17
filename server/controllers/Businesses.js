import Businesses from "../model/BusinessesModel.js";
import Locations from "../model/LocationsModel.js";
import Reviews from "../model/ReviewsModel.js";
import sequelize from "sequelize";
import Users from "../model/UsersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
Locations.hasMany(Businesses, { foreignKey: "businesse_location_id" });
Businesses.belongsTo(Locations, { foreignKey: "businesse_location_id" });
Businesses.hasMany(Reviews, { foreignKey: "business_id" });
Users.hasMany(Reviews, { foreignKey: "user_id" });

export const getBusinessesByCategoryId = async (req, res) => {
  try {
    const businesses = await Businesses.findAll({
      where: {
        businesse_category_id: req.body.businesse_category_id,
      },
    });
    res.json(businesses);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "businesses not found" });
  }
};

export const loginBusiness = async (req, res) => {
  try {
    const business = await Businesses.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, business[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });
    const id = business[0].id;
    const email = req.body.email;
    const role = business[0].role;
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

export const registerBusiness = async (req, res) => {
  const {
    email,
    password,
    businessName,
    businessDescription,
    businessLocation,
    categoryId,
    customerContactEmail,
    customerContactPhone,
    activeSince,
  } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await Businesses.create({
      email: email,
      password: hashPassword,
      businesse_name: businessName,
      businesse_category_id: categoryId,
      businesse_location_id: businessLocation,
      businesse_description: businessDescription,
      customer_contact_email: customerContactEmail,
      customer_contact_phone: customerContactPhone,
      activeSince: activeSince,
    });
    res.json({ msg: "Registered successfully" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "Email already exists" });
  }
};

export const getBusinessesById = async (req, res) => {
  try {
    const business = await Businesses.findAll({
      where: {
        id: req.body.id,
      },
    });
    res.json(business);
  } catch (err) {
    console.log("error error", err);
    res.status(404).json({ msg: "business not found" });
  }
};

export const buisnessesWithLocation = async (req, res) => {
  try {
    const businesses = await Businesses.findAll({ include: [Locations] });

    res.json(businesses);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "businesses not found" });
  }
};

export const buisnessWithLocation = async (req, res) => {
  try {
    const business = await Businesses.findAll({ where: { id: req.body.id }, include: [Locations] });

    console.log(business);
    res.json(business);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "business not found" });
  }
};

export const buisnessWithLocationAndReviews = async (req, res) => {
  try {
    const business = await Businesses.findAll({
      where: { id: req.headers.header },
      include: [Locations, { model: Reviews, include: Users }],
    });
    const rating = await Reviews.findAll({
      where: { business_id: req.headers.header },
      attributes: [sequelize.fn("AVG", sequelize.col("rating"))],
      raw: true,
    });
    res.json([business, rating]);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "business not found" });
  }
};

export const buisnessesWithLocationsByCatId = async (req, res) => {
  try {
    const businesses = await Businesses.findAll({
      where: { businesse_category_id: req.body.businesse_category_id },
      include: [Locations, Reviews],
    });

    res.json(businesses);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "businesses not found" });
  }
};

export const getBusinessesByLocationId = async (req, res) => {
  try {
    const business = await Businesses.findAll({
      where: {
        businesse_location_id: req.body.id,
      },
      include: [Locations, Reviews],
    });
    res.json(business);
  } catch (err) {
    console.log("error error", err);
    res.status(404).json({ msg: "business not found" });
  }
};

export const getBusinessesBySearch = async (req, res) => {
  try {
    const business = await Businesses.findAll({
      where: {
        [Op.or]: [
          { businesse_description: { [Op.iLike]: `%${req.body.search}%` } },
          { businesse_name: { [Op.iLike]: `%${req.body.search}%` } },
        ],
      },
      include: [Locations, Reviews],
    });

    res.json(business);
  } catch (err) {
    console.log("error error", err);
    res.status(404).json({ msg: "business not found" });
  }
};

export const getBusinessesBySearchAndLocationId = async (req, res) => {
  try {
    const business = await Businesses.findAll({
      where: {
        [Op.or]: [
          { businesse_description: { [Op.iLike]: `%${req.body.search}%` } },
          { businesse_name: { [Op.iLike]: `%${req.body.search}%` } },
        ],
        businesse_location_id: req.body.location,
      },
      include: [Locations, Reviews],
    });
    res.json(business);
  } catch (err) {
    console.log("error error", err);
    res.status(404).json({ msg: "business not found" });
  }
};

export const buisnessesWithLocationAndReviewsByLocationId = async (req, res) => {
  try {
    const business = await Businesses.findAll({ where: { location_id: req.headers.header }, include: [Locations, Reviews] });
    // const rating = await Reviews.findAll({
    //   where: { location_id: req.headers.header },
    //   attributes: [sequelize.fn("AVG", sequelize.col("rating"))],
    //   raw: true,
    // });
    res.json(business);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "business not found" });
  }
};

export const updateBusinessInfo = async (req, res) => {
  console.log(req.body.businesse_description, req.body.business_id);
  try {
    await Businesses.update(
      { businesse_description: req.body.businesse_description },
      {
        where: { id: req.body.business_id },
      }
    );
    res.json("success");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

export const allBuisnessesWithLocationAndReviews = async (req, res) => {
  try {
    const businesses = await Businesses.findAll({
      order: [["id", "DESC"]],
      limit: 4,
      include: [Locations, { model: Reviews, include: Users }],
    });

    res.json(businesses);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "business not found" });
  }
};
