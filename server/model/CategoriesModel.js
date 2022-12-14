import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Categories = db.define(
  "categories",
  {
    category: {
      type: DataTypes.STRING,
    },
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  { freezeTableName: true }
);

export default Categories;
