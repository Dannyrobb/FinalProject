import Reviews from "../model/ReviewsModel.js";
import sequelize from "sequelize";
import Users from "../model/UsersModel.js";
import Businesses from "../model/BusinessesModel.js";
Businesses.hasMany(Reviews, { foreignKey: "business_id" });
Reviews.belongsTo(Businesses, { foreignKey: "business_id" });

Users.hasMany(Reviews, { foreignKey: "user_id" });
export const getReviewsByBusinessId = async (req, res) => {
  try {
    const reviews = await Reviews.findAll({
      where: { business_id: req.body.id },
    });

    res.json(reviews);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "categories not found" });
  }
};

export const getRatingAverageByBusinessId = async (req, res) => {
  try {
    const rating = await Reviews.findAll({
      where: { business_id: req.body.id },
      attributes: [sequelize.fn("AVG", sequelize.col("rating"))],
      raw: true,
    });

    res.json(rating);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "yeah nah" });
  }
};

export const insertReviewByBusinessId = async (req, res) => {
  const { rating, user_id, business_id, review } = req.body;
  try {
    await Reviews.create({
      rating,
      user_id,
      business_id,
      review,
    });
    res.json({ msg: "Reviewed successfully" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "Already Reviewed Business" });
  }
};

export const checkIfReviewed = async (req, res) => {
  try {
    const userReview = await Reviews.findAll({
      where: { business_id: req.headers.business_id, user_id: req.headers.user_id },
    });
    res.json(userReview);
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "Oops... something went wrong !" });
  }
};

export const insertReviewReplyByBusinessId = async (req, res) => {
  try {
    await Reviews.update(
      {
        review_reply: req.body.review,
      },
      {
        where: { user_id: req.body.user_id, business_id: req.body.business_id },
      }
    );
    res.json({ msg: "Successfully Updated!" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "Oops... something went wrong !" });
  }
};

export const updateReviewByReviewId = async (req, res) => {
  try {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    await Reviews.update(
      {
        review: req.body.review,
        rating: req.body.rating,
        review_date: currentDate,
      },
      {
        where: { user_id: req.body.user_id, business_id: req.body.business_id },
      }
    );
    res.json({ msg: "Successfully Updated!" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "Oops... something went wrong !" });
  }
};

export const deleteReviewByReviewId = async (req, res) => {
  try {
    console.log(req.headers.review_id);
    await Reviews.destroy({
      where: { review_id: req.params.data },
    });
    res.json({ msg: "Successfully Deleted!" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "Oops... something went wrong !" });
  }
};

export const updateReviewReply = async (req, res) => {
  console.log(req.body.review_reply, req.body.user_id, req.body.business_id);
  try {
    await Reviews.update(
      {
        review_reply: req.body.review_reply,
      },
      {
        where: { user_id: req.body.user_id, business_id: req.body.business_id },
      }
    );
    res.json({ msg: "Successfully Updated!" });
  } catch (e) {
    console.log(e);
    res.status(404).json({ msg: "Oops... something went wrong !" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Reviews.findAll({
      include: [Users, Businesses],
      order: [["review_date", "DESC"]],
      limit: 4,
    });

    res.json(reviews);
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "business not found" });
  }
};

export const reviewsLowestToHighest = async (req, res) => {
  try {
    const reviews = await Reviews.findAll({
      where: { business_id: req.headers.header },
      include: [Users],
      order: [["rating", "ASC"]],
    });
    res.json(reviews);
  } catch (e) {
    res.json(e);
  }
};

export const reviewsHighestToLowest = async (req, res) => {
  try {
    const reviews = await Reviews.findAll({
      where: { business_id: req.headers.header },
      include: [Users],
      order: [["rating", "DESC"]],
    });
    res.json(reviews);
  } catch (e) {
    res.json(e);
  }
};
