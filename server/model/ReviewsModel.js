import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Reviews = db.define(
  "reviews",
  {
    review_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    business_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },

    review_date: {
      type: DataTypes.DATEONLY,
    },
    review: {
      type: DataTypes.STRING,
    },
    review_reply: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true }
);

export default Reviews;
