import express from "express";
import { getCategories, getCategoryById, getCategoriesAndBusinesses } from "../controllers/Categories.js";
import { VerifyToken } from "../middlewares/VerifyToken.js";
const categoryRouter = express.Router();

categoryRouter.get("/categories", getCategories);
categoryRouter.post("/categoryById", getCategoryById);

categoryRouter.get("/getCategoriesAndBusinesses", getCategoriesAndBusinesses);
export default categoryRouter;
