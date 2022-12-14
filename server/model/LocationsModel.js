import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Locations = db.define(
  "locations",
  {
    location_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    location_name: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
  },
  { freezeTableName: true }
);

export default Locations;
