import express from "express";
import {
  checkIfReviewed,
  getReviewsByBusinessId,
  getRatingAverageByBusinessId,
  insertReviewByBusinessId,
  insertReviewReplyByBusinessId,
  updateReviewByReviewId,
  deleteReviewByReviewId,
  updateReviewReply,
  getAllReviews,
  reviewsLowestToHighest,
  reviewsHighestToLowest,
} from "../controllers/Reviews.js";
const reviewsRouter = express.Router();
reviewsRouter.get("/getallreviews", getAllReviews);
reviewsRouter.post("/reviewsbybusinessid", getReviewsByBusinessId);
reviewsRouter.post("/getRatingAverageByBusinessId", getRatingAverageByBusinessId);
reviewsRouter.post("/insertReviewByBusinessId", insertReviewByBusinessId);
reviewsRouter.get("/checkIfReviewed", checkIfReviewed);
reviewsRouter.put("/insertReviewReplyByBusinessId", insertReviewReplyByBusinessId);
reviewsRouter.put("/updateReviewByReviewId", updateReviewByReviewId);
reviewsRouter.delete("/deleteReviewByReviewId/:data", deleteReviewByReviewId);
reviewsRouter.put("/updateReviewReply", updateReviewReply);
reviewsRouter.get("/reviewsLowestToHighest", reviewsLowestToHighest);
reviewsRouter.get("/reviewsHighestToLowest", reviewsHighestToLowest);

export default reviewsRouter;
