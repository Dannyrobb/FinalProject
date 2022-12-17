import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Businesses = db.define(
  "businesses",
  {
    businesse_name: {
      type: DataTypes.STRING,
    },
    businesse_description: {
      type: DataTypes.STRING,
    },
    businesse_location_id: {
      type: DataTypes.INTEGER,
    },
    businesse_category_id: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    customer_contact_email: {
      type: DataTypes.STRING,
    },
    customer_contact_phone: {
      type: DataTypes.STRING,
    },
    activeSince: {
      type: DataTypes.INTEGER,
    },
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    // },
  },
  { freezeTableName: true }
);

export default Businesses;
