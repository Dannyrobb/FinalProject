import express from "express";
import { VerifyToken } from "../middlewares/VerifyToken.js";
import { getLocations } from "../controllers/Locations.js";

const locationsRouter = express.Router();

locationsRouter.get("/locations", getLocations);

export default locationsRouter;
