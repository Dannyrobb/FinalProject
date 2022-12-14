import express from "express";
import {
  getBusinessesByCategoryId,
  registerBusiness,
  loginBusiness,
  getBusinessesById,
  buisnessesWithLocation,
  buisnessWithLocation,
  buisnessesWithLocationsByCatId,
  getBusinessesByLocationId,
  getBusinessesBySearch,
  getBusinessesBySearchAndLocationId,
  buisnessWithLocationAndReviews,
  buisnessesWithLocationAndReviewsByLocationId,
  updateBusinessInfo,
  allBuisnessesWithLocationAndReviews,
} from "../controllers/Businesses.js";
import { VerifyToken } from "../middlewares/VerifyToken.js";
const businessRouter = express.Router();

businessRouter.post("/getBusinessesByCategoryId", getBusinessesByCategoryId);
businessRouter.post("/registerNewBusiness", registerBusiness);
businessRouter.post("/loginBusiness", loginBusiness);
businessRouter.post("/getBusinessesById", getBusinessesById);
businessRouter.get("/getBusinessesWithLocations", buisnessesWithLocation);
businessRouter.post("/getBusinessWithLocation", buisnessWithLocation);
businessRouter.post("/buisnessesWithLocationsByCatId", buisnessesWithLocationsByCatId);
businessRouter.post("/getBusinessesByLocationId", getBusinessesByLocationId);
businessRouter.post("/getBusinessesBySearch", getBusinessesBySearch);
businessRouter.post("/getBusinessesBySearchAndLocationId", getBusinessesBySearchAndLocationId);
businessRouter.get("/buisnessWithLocationAndReviews", buisnessWithLocationAndReviews);
businessRouter.get("/buisnessWithLocationAndReviewsByLocationId", buisnessesWithLocationAndReviewsByLocationId);
businessRouter.put("/updateBusinessInfo", updateBusinessInfo);
businessRouter.get("/allBuisnessesWithLocationAndReviews", allBuisnessesWithLocationAndReviews);
export default businessRouter;
